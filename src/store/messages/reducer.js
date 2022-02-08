import { AUTHORS } from "../../utils/constants";
import { ADD_MESSAGE } from "./actions";


const initialMessages = {
    1: [
        {
            author: AUTHORS.user,
            text: "text1",
            id: Date.now()
        },
        {
            author: AUTHORS.user,
            text: "text1test",
            id: Date.now() + Math.ceil(Math.random() * 10)
        },
    ],
    2: [
        {
            author: AUTHORS.user,
            text: "this is chat2",
            id: Date.now()
        },
    ],
    3: [{
        author: AUTHORS.user,
        text: "text3",
        id: Date.now()
    },],
};


export const messagesReducer = (state = initialMessages, { type, payload }) => {
    switch (type) {
        case ADD_MESSAGE:
            return {
                ...state,
                [payload.chatId]: [
                    //без этого предыдущие сообщения этого чата не сохранятся?
                    ...state[payload.chatId],
                    {
                        author: AUTHORS.user,
                        text: payload.text,
                        id: Date.now() + Math.ceil(Math.random() * 10),
                    },
                ],
            };

        default:
            return state;
    };
};

