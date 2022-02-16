import React from "react";
import { AUTHORS } from "../../utils/constants";
import { isChangingMessage } from "../../store/messages/actions"
import { useDispatch } from "react-redux";
// import './Message.css';

const initialMessages = {

    messageList: {
        1: [
            {
                author: AUTHORS.user,
                text: "text1",
                id: 1644960382294
            },
            {
                author: AUTHORS.user,
                text: "text1test",
                id: 1644960382266
            },
        ],
        2: [
            {
                author: AUTHORS.user,
                text: "this is chat2",
                id: 1644960382294
            },
        ],
        3: [{
            author: AUTHORS.user,
            text: "text3",
            id: Date.now() + Math.ceil(Math.random() * 100)
        },],
    },
    changed: {
        change: false,
        changeId: null,
    },
};


export function Message({ chatId, idToChange, newText }) {
    const dispatch = useDispatch();

    const handleClick = () => {
        const changeIndex = initialMessages.messageList[chatId].findIndex((message) => {

            console.log(message.id);
            return message.id === idToChange;
        }
        )
        console.log(changeIndex);

        const newState = initialMessages.messageList;
        newState[chatId][changeIndex] = {
            ...newState[chatId][changeIndex],
            text: newText,
        };
        dispatch(isChangingMessage(false, null));
        return newState;
    }

    return (
        <div className="Message">
            {initialMessages.messageList[chatId].map((msg) => {
                return (
                    <div key={msg.id}>
                        <div>{msg.author}</div>
                        <div>{msg.text}</div>
                    </div>
                )
            })}
            <input type="button" onClick={handleClick} />
        </div>
    )
}