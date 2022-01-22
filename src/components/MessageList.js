import React from "react"
import { AUTHORS } from "../utils/constants"
import './MessageList.css'

export function MessagesList({ messages }) {



    // return messages.map(message => {
    //     return (
    //         <div className="messageList">
    //             <div className="messageList__author">{message.author}</div>
    //             <div className="messageList">{message.text}</div>
    //         </div>
    //     )
    // });

    return <div className="messageList">
        {messages.map(message => {
            return (
                <div className={`${message.author === AUTHORS.user ? "messageList__item" : "messageList__item bot"}`}>
                    <div className="messageList__author">{message.author}</div>
                    <div className="messageList__text">{message.text}</div>
                </div>
            )
        }
        )
        }
    </div>
}