import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from 'react';
import { changeName } from "../../store/profile/actions";
// import { store } from "../../store/index"

export function Profile() {
    // так нельзя, потому что в мы напрямую изменяет стор, к тому же Реакт не среагирует на изменение стора и не обновится
    // const state = store.getState();

    // const { checkbox, name } = useSelector(state => state);
    const checkbox = useSelector(state => state.checkbox);
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // value - значение инпута
    const [value, setValue] = useState('');

    const setName = useCallback(() => {
        //вызываем экшн и меняем свойство name, передавая туда value - в dispatch передается результат(!) вызова action creator, т.е. объект экшен с заранее определенным типом и данными, переданными через аргумент.
        //В дальнейшем для создания экшенов следует придерживаться только такого подхода - т.е. создавать их с помощью action creators.
        dispatch(changeName(value));
        //без value в аргументах value не меняется здесь (проверить через console.log(value))
    }, [dispatch, value]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            setName(value);
        }
        setValue('');
    };


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
        </div>
    )
}