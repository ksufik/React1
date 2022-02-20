import { useEffect, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Button } from '../Button/Button';
import { deleteMessage, initMsgsTracking, isChangingMessage } from "../../store/messages/actions"
import { getMessages } from "../../store/messages/selectors";
import { getProfileName } from "../../store/profile/selectors";
import './MessageList.sass'
import { messagesRef } from '../../services/firebase';
import { onValue } from 'firebase/database';



export function MessagesList({ chatId }) {
    useEffect(() => {
        console.log("messageList did mount");
        dispatch(initMsgsTracking());
        return () => console.log("messageList will unmount");
    }, []);


    //берем имя из стора
    //const profileName = useSelector(state => state.profile.name);
    //const messages = useSelector(state => state.messages.messageList);
    const dispatch = useDispatch();


    const profileName = useSelector(getProfileName);
    const messages = useSelector(getMessages, shallowEqual);


    const handleDeleteMessage = (id) => {
        dispatch(deleteMessage(chatId, id));
    }


    const handleChangeMessage = (id) => {
        dispatch(isChangingMessage(true, id));
    }

    return <div className="messageList">
        {messages[chatId].map(message => {
            return (
                <div key={message.id} className={`${message.author === AUTHORS.user ? "messageList__item" : "messageList__item bot"}`}>
                    <div className="messageList__author">{message.author === AUTHORS.user ? profileName : message.author}
                    </div>
                    <div className="messageList__text">{message.text}</div>
                    {/* {message.author === AUTHORS.user &&  */}
                    <Button name={"Удалить"} type="button" onPress={() => handleDeleteMessage(message.id)}></Button>
                    {/* } */}
                    {message.author === AUTHORS.user && <Button name={"Изменить - не работает"} type="button" onPress={() => handleChangeMessage(message.id)}></Button>}
                </div>
            )
        }
        )
        }
    </div>
}