//ChatList
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import './ChatList.sass'
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";





export function ChatList({ chatList, onAddChat, onDeleteChat }) {

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
            onAddChat({
                name: chatName,
                id: Date.now()
            });
        }

        setChatName('');
    }


    // const addChat = useCallback((newChat) => {
    //     setChatList((prev) => ([...prev, newChat]));

    //     console.log(chatList);
    // }, [chatList]);

    return (
        <>
            <div className="flex">
                <ul className="list">
                    <h3>Список чатов</h3>
                    {chatList.map(chat => (
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
                                <Button name={"Удалить"} onPress={() => onDeleteChat(chat.id)}></Button>
                            </li>
                        </span>
                    ))}
                    <form onSubmit={handleAddChat}>
                        <Button addStyle="button__mt20" name={inputIsShown && chatName === "" ? "Скрыть форму" : "Добавить"} onPress={() => handleAddChat}></Button>
                        <div className="list__input">
                            {inputIsShown && <Input placeholder='Впишите название чата' chatName={chatName} handleChange={handleChange} />}
                        </div>
                    </form>
                </ul>
                <Outlet />
            </div>

        </>
    )
}