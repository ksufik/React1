import { useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';
import { useSelector, useDispatch } from "react-redux";
import './MessageList.sass'

export function MessagesList({ }) {
    useEffect(() => {
        console.log("messageList did mount");

        return () => console.log("messageList will unmount");
    }, []);


    //берем имя из стора
    const profileName = useSelector(state => state.profile.name);
    const messages = useSelector(state => state.messages);

    return <div className="messageList">
        {messages.map(message => {
            return (
                <div key={message.id} className={`${message.author === AUTHORS.user ? "messageList__item" : "messageList__item bot"}`}>
                    <div className="messageList__author">{message.author === AUTHORS.user ? profileName : message.author}
                    </div>
                    <div className="messageList__text">{message.text}</div>
                </div>
            )
        }
        )
        }
    </div>
}