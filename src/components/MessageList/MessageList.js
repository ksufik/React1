import { useEffect, useState } from 'react';
import { AUTHORS } from '../../utils/constants';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Button } from '../Button/Button';
import { deleteMessage, initMsgsTracking, isChangingMessage } from "../../store/messages/actions"
import { getMessages } from "../../store/messages/selectors";
import { getProfileName } from "../../store/profile/selectors";
import './MessageList.sass'
import { getMessageRefById, getMsgsRefByChatId, messagesRef, userRef } from '../../services/firebase';
import { onChildRemoved, onValue, remove, set } from 'firebase/database';
import { Form } from '../Form/Form';



export function MessagesList({ chatId, messages, setMessages }) {
    useEffect(() => {
        console.log("messageList did mount");
        return () => console.log("messageList will unmount");
    }, []);


    //берем имя из стора
    //const profileName = useSelector(state => state.profile.name);
    //const messages = useSelector(state => state.messages.messageList);
    const dispatch = useDispatch();


    const profileName = useSelector(getProfileName);
    // const messages = useSelector(getMessages, shallowEqual);

    // const [messages, setMessages] = useState([]);


    useEffect(() => {
        const unsubscribe = onChildRemoved(getMsgsRefByChatId(chatId), (snapshot) => {
            setMessages(prevMsgs => prevMsgs.filter(({ id }) => id !== snapshot.val()?.id));
        })

        return unsubscribe;
    }, []);

    const handleDeleteMessage = (id) => {
        // dispatch(deleteMessage(chatId, id));
        remove(getMessageRefById(chatId, id));
    }


    const handleChangeMessage = (id) => {
        dispatch(isChangingMessage(true, id));
        // set(getMessageRefById(chatId, id), { author: AUTHORS.user, id: id, text: "edited text" });

    }

    return <div className="messageList">
        {/* {messages[chatId].map(message => { */}
        {messages.map(message => {
            return (
                <div key={message.id} className={`${message.author === AUTHORS.user ? "messageList__item" : "messageList__item bot"}`}>
                    <div className="messageList__author">{message.author === AUTHORS.user ? profileName : message.author}
                    </div>
                    {/* <div className="messageList__author">{message.author}
                    </div> */}
                    {/* <div className="messageList__author">{userName}
                    </div> */}
                    <div className="messageList__text">{message.text}</div>
                    {/* {message.author === AUTHORS.user &&  */}
                    <Button value={"Удалить"} type="button" onClick={() => handleDeleteMessage(message.id)}></Button>
                    {/* } */}
                    {message.author === AUTHORS.user && <Button value={"Изменить"} type="button" onClick={() => handleChangeMessage(message.id)}></Button>}
                </div>
            )
        }
        )
        }
    </div>
}