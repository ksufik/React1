import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from 'react';
import { changeName } from "../../store/profile/actions";
import { getProfileName } from "../../store/profile/selectors";
import { Button } from "../Button/Button";
import { logOut, userRef } from "../../services/firebase";
import { onValue, set } from "firebase/database";
// import { store } from "../../store/index"

export function Profile() {
    // так нельзя, потому что в мы напрямую изменяет стор, к тому же Реакт не среагирует на изменение стора и не обновится
    // const state = store.getState();

    // const checkbox = useSelector(state => state.checkbox);
    //const name = useSelector(state => state.profile.name);
    const dispatch = useDispatch();

    const name = useSelector(getProfileName);
    // value - значение инпута
    const [value, setValue] = useState('');

    const setName = useCallback(() => {
        //вызываем экшн и меняем свойство name, передавая туда value - в dispatch передается результат(!) вызова action creator, т.е. объект экшен с заранее определенным типом и данными, переданными через аргумент.
        //В дальнейшем для создания экшенов следует придерживаться только такого подхода - т.е. создавать их с помощью action creators.
        dispatch(changeName(value));
        //без value в аргументах value не меняется здесь (проверить через console.log(value))
    }, [dispatch]);

    useEffect(() => {
        //snapshot - коллбэк, который будет отрабатывать каждый раз при изменении userRef
        //snapshot - это обертка, ближе в бд
        const unsubscribe = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            //данные в сторе изменяются в ответ на изменение данных в базе
            if (value !== '') {
                setName(userData?.name || '');
            }
        });
        return unsubscribe;
    }, [setName]);


    const handleChange = (e) => {
        setValue(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        //set перепишет все(!) данные по указанному адресу на новые
        set(userRef, {
            name: value
        });
        setValue('');
    };

    const handleLogOut = async () => {
        try {
            await logOut();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Profile page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    // checked={checkbox}
                    value={value}
                    onChange={handleChange}
                />
                <div>Name = {name}</div>
                <div>
                    <input type="submit" value="Change Name" />
                </div>
            </form>
            <div>
                <Button type="button" name="Sign Out" onPress={handleLogOut} />
            </div>
        </div>
    )
}