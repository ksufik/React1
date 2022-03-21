import { onChildChanged, onChildRemoved, remove, set } from "firebase/database"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { chatsRef, getChatRefById } from "../../services/firebase"
import { deleted } from "../../store/chatList/actions"
import { Button } from "../Button/Button"
import { Input } from "../Input/Input"
import './ModalWindow.sass'

export function ModalWindow({ item, setModalIsShown }) {
    const dispatch = useDispatch();
    const [changingChatName, setChangingChatName] = useState();
    const [changeInputIsShown, setChangeInputIsShown] = useState(false);
    const [chatName, setChatName] = useState('');

    const handleChangeName = (e) => {
        setChatName(e.target.value);
    }


    const handleDeleteChat = (id) => {
        dispatch(deleted(true));
        // dispatch(deleteChat(id));
        // set(getChatRefById(id), null);
        remove(getChatRefById(id));
        setModalIsShown(false);
    }




    const handleChangeChatName = (id) => {
        setChangingChatName(id);
        setChangeInputIsShown((prevState) => !prevState);

        if (chatName !== '') {
            //  dispatch(changeChatName(id, chatName));
            set(getChatRefById(id), { id: id, name: chatName });
        }
        setChatName('');
        // setModalIsShown(false);
    }

    return (
        <div className={'modalWindow'}>
            <div className="modalWindow__content" >
                <Button value={"Удалить"} type="button" onClick={() => handleDeleteChat(item)}></Button>

                <Button value={changeInputIsShown && chatName === "" ? "Скрыть форму" : "Изменить название"} type="button" onClick={() => handleChangeChatName(item)}></Button>
                {changingChatName === item && changeInputIsShown && <Input placeholder='Впишите название чата' value={chatName} onChange={handleChangeName} ></Input>}
            </div>
        </div>
    )
} 