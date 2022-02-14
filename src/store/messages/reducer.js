import { AUTHORS } from "../../utils/constants";
import { ADD_MESSAGE, DELETE_MESSAGE, CHANGE_MESSAGE, IS_CHANGE_MESSAGE } from "./actions";
import { ADD_CHAT, DELETE_CHAT } from "../chatList/actions";


const initialMessages = {

    messageList: {
        1: [
            {
                author: AUTHORS.user,
                text: "text1",
                id: Date.now() + Math.ceil(Math.random() * 100)
            },
            {
                author: AUTHORS.user,
                text: "text1test",
                id: Date.now() + Math.ceil(Math.random() * 100)
            },
        ],
        2: [
            {
                author: AUTHORS.user,
                text: "this is chat2",
                id: Date.now() + Math.ceil(Math.random() * 100)
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


export const messagesReducer = (state = initialMessages, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE:
            const currentList = state.messageList[payload.chatId] || [];
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [payload.chatId]: [
                        ...currentList,
                        {
                            // author: AUTHORS.user,
                            author: payload.author,
                            text: payload.text,
                            id: Date.now() + Math.ceil(Math.random() * 100),
                        },
                    ],
                },
            };
        case ADD_CHAT:
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [payload.id]: [],
                }
            }
        case DELETE_MESSAGE: {
            //Проблема с удалением сообщений. Сделала, как у вас (по-другому не получалось). При этом в стейте все работает корректно.
            //Однако на экране сообщения обновляются только при добавлении нового.
            const newMessages = { ...state };
            newMessages.messageList[payload.chatId] = newMessages.messageList[payload.chatId].filter(
                (el => el.id !== payload.deletingId));

            return newMessages;
        }
        case DELETE_CHAT:
            const newMessages = { ...state };
            delete newMessages.messageList[payload.id];
            return newMessages;
        case CHANGE_MESSAGE:
            // let messages = state.messageList;
            // const messageId = state.chatList.findIndex((el) => el.id === payload.id);
            // messages[messageId] = {
            //     author: AUTHORS.user,
            //     text: payload.text,
            //     id: payload.id
            // }
            // return {
            //     ...state,
            //     messageList: messages,
            // }
            let messages = state.messageList;
            // const messageId = state.chatList.findIndex((el) => el.id === payload.id);
            messages[payload.key1][payload.key2] = {
                author: AUTHORS.user,
                text: payload.message.text,
                id: payload.message.id
            }
            return {
                ...state,
                messageList: messages,

            }
        case IS_CHANGE_MESSAGE:
            return {
                ...state,
                changed:
                {
                    change: payload.change,
                    changeId: payload.changeId
                }
            }
        default:
            return state;
    };
};

