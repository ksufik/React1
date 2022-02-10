//ChatList
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import './ChatList.sass'
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addChat, deleteChat, deleted } from "../../store/chatList/actions"
import { getChatList } from "../../store/chatList/selectors";



export function ChatList({ }) {

    //с использованием хука, но у него есть минусы:
    // Повторение кода (селектор для имени профиля используется дважды в разных компонентах, и каждый раз создается новая стрелочная функция)
    // react-redux не может закэшировать результат вызова селектора, т.к. функция-селектор каждый раз создается заново

    //const chats = useSelector(state => state.chatList.chatList);
    const dispatch = useDispatch();

    //С использование selectors
    //shallowEqual - т.к. в UseSelectors используется ссылочное сравнение старых и новых данных, иногда компонент может обновляться лишний раз
    //shallowEqual - функция для поверхностного сравнения двух значений(старого и нового) и лишний раз не вызывается)
    const chats = useSelector(getChatList, shallowEqual);

    //для показа модального окна
    const [modalIsShown, setModalIsShown] = useState(false);
    const modalCkickHandler = () => {
        setModalIsShown(!modalIsShown);
    }

    //для показа инпута
    const [inputIsShown, setInputIsShown] = useState(false);


    const [chatName, setChatName] = useState('');

    const handleChange = (e) => {
        setChatName(e.target.value);
    }



    const handleAddChat = (e) => {
        e.preventDefault();

        setInputIsShown(!inputIsShown);

        if (chatName !== '') {
            dispatch(addChat(chatName));
        }

        setChatName('');
    }

    // const [deleted, setDeleted] = useState(false);

    const handleDeleteChat = (id) => {
        dispatch(deleted(true));
        dispatch(deleteChat(id));
    }




    return (
        <>
            <div className="flex">
                <ul className="list">
                    <h3>Список чатов</h3>
                    {chats.map(chat => (
                        <span key={chat.id}>
                            <li className="list__li">
                                <NavLink className="list__link"
                                    style={({ isActive }) => ({ className: isActive ? "active" : "" })}
                                    to={`/chats/${chat.id}`} >
                                    {chat.name}
                                </NavLink>
                                <div className="list__modal" >
                                    <div className="list__modal__mark" onClick={modalCkickHandler} >:
                                    </div>
                                    <ModalWindow active={modalIsShown} item={chat.id}></ModalWindow>

                                </div>
                                <Button name={"Удалить"} inputType="button" onPress={() => handleDeleteChat(chat.id)}></Button>
                            </li>
                        </span>
                    ))}
                    <form onSubmit={handleAddChat}>
                        <Button addStyle="button__mt20" inputType="submit" name={inputIsShown && chatName === "" ? "Скрыть форму" : "Добавить"}></Button>
                        <div className="list__input">
                            {inputIsShown && <Input placeholder='Впишите название чата' chatName={chatName} handleChange={handleChange} />}
                        </div>
                    </form>
                    {/* onPress={() => handleAddChat} */}
                </ul>
                <Outlet />
            </div>

        </>
    )
}