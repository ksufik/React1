import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useState, useCallback, useEffect } from 'react';
import { changeName } from "../../store/profile/actions";
import { getProfileName } from "../../store/profile/selectors";
import { Button } from "../Button/Button";
import { auth, logOut, messagesRef, userIdRef, userRef } from "../../services/firebase";
import { onChildChanged, onValue, set } from "firebase/database";
// import { store } from "../../store/index"

export function Profile() {
    // так нельзя, потому что в мы напрямую изменяет стор, к тому же Реакт не среагирует на изменение стора и не обновится
    // const state = store.getState();

    const [loading, setLoading] = useState(false);

    // const checkbox = useSelector(state => state.checkbox);
    //const name = useSelector(state => state.profile.name);
    const dispatch = useDispatch();

    const name = useSelector(getProfileName);
    // const [name, setName] = useState('');
    // value - значение инпута
    const [value, setValue] = useState('');

    // const setName = useCallback(() => {
    //     //вызываем экшн и меняем свойство name, передавая туда value - в dispatch передается результат(!) вызова action creator, т.е. объект экшен с заранее определенным типом и данными, переданными через аргумент.
    //     //В дальнейшем для создания экшенов следует придерживаться только такого подхода - т.е. создавать их с помощью action creators.
    //     dispatch(changeName(value));
    //     //без value в аргументах value не меняется здесь (проверить через console.log(value))
    //     console.log('v: ', value);
    // }, [dispatch]);

    // useEffect(() => {
    //     //snapshot - коллбэк, который будет отрабатывать каждый раз при изменении userRef
    //     //snapshot - это обертка, ближе в бд
    //     //onValue - слушатель изменения значения по адресу (userRef)
    //     const unsubscribe = onValue(userRef, (snapshot) => {
    //         const userData = snapshot.val();
    //         console.log('ud', userData);
    //         //данные в сторе изменяются в ответ на изменение данных в базе
    //         if (value !== '') {
    //             setName(userData?.name || '');
    //         }
    //     });
    //     return unsubscribe;
    // }, [setName]);


    const handleChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {

        const unsubscribe = onValue(userRef, (chatsSnap) => {
            // setName(chatsSnap.val()?.name);
            dispatch(changeName(chatsSnap.val()?.name));
        })
        return unsubscribe;
    }, []);

    useEffect(() => {
        // слушатель для изменения св-ва автор в сообщениях
        const unsubscribe = onChildChanged(userRef, (chatsSnap) => {
            // chatsSnap.forEach(el => console.log(el));
            // console.log(chatsSnap);
            // console.log(messagesRef);
        })
        return unsubscribe;
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        //set перепишет все(!) данные по указанному адресу на новые
        if (value !== '') {
            set(userRef, {
                name: value,
                id: auth.currentUser.uid,
            });
            //  dispatch(changeName(value));
            //  setName(value);
            setValue('');
        }
    };

    const handleLogOut = async () => {
        setLoading(true);
        try {
            await logOut();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Profile page</h1>
            {loading ? <CircularProgress /> :
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            // checked={checkbox}
                            value={value}
                            onChange={handleChange}
                        />
                        <div>Name = {name}</div>
                        <div>
                            <Button type="submit" value="Change Name" />
                        </div>
                    </form>
                    <Button className='button__mt20' type="button" value="Sign Out" onClick={handleLogOut} />
                </>
            }
        </div>
    )
}