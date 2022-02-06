import { useEffect } from 'react';
import './MessageList.sass'

export function MessagesList({ messages }) {
    useEffect(() => {
        console.log("messageList did mount");

        return () => console.log("messageList will unmount");
    }, []);

    return <div className="messageList">
        {messages.map(message => {
            return (
                <div key={message.id} className={`${message.author === "user" ? "messageList__item" : "messageList__item bot"}`}>
                    <div className="messageList__author">{message.author}</div>
                    <div className="messageList__text">{message.text}</div>
                </div>
            )
        }
        )
        }
    </div>
}