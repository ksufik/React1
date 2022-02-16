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
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [payload.chatId]: state.messageList[payload.chatId].filter(
                        el => el.id !== payload.deletingId)
                }
            }
        }
        case DELETE_CHAT:
            const newMessages = { ...state };
            delete newMessages.messageList[payload.id];
            return newMessages;
        case CHANGE_MESSAGE:

            //var3
            const changeIndex = state.messageList[payload.chatId].findIndex((message) =>
                message.id === payload.idToChange);

            const newState = { ...state };
            newState.messageList[payload.chatId][changeIndex] = {
                ...newState.messageList[payload.chatId][changeIndex],
                text: payload.newText,
            };
            return newState;
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

