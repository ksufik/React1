//ChatList

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import './ChatList.sass'

// массив чатов
const chatList = [
    {
        name: "chat1",
        id: "1",
    },
    {
        name: "chat2222222222",
        id: "2",
    },
    {
        name: "chat3",
        id: "3",
    },
];


export function ChatList() {

    const [isShown, setIsShown] = useState(false);
    const modalCkickHandler = (e) => {
        setIsShown(!isShown);
    }

    return (
        <>
            <ul className="list">
                <h3>Список чатов</h3>
                {chatList.map(chat => (
                    <>
                        <li className="list__li" key={chat.id}>
                            <NavLink className="list__link"
                                style={({ isActive }) => ({ className: isActive ? "active" : "" })}
                                to={`/chats/${chat.id}`} >
                                {chat.name}
                            </NavLink>
                            <div className="list__modal" >
                                <div className="list__modal__mark" onClick={modalCkickHandler} >:
                                    <ModalWindow active={isShown} item={chat.id}></ModalWindow>
                                </div>
                            </div>
                        </li>

                    </>
                ))}

            </ul>

        </>
    )

}