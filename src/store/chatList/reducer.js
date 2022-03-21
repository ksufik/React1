import { ADD_CHAT, DELETE_CHAT, DELETED, CHANGE_CHAT_NAME, SET_CHATS } from "./actions";

// const initialState = {
//     chatList: [
//         {
//             name: "chat1",
//             id: 1,
//         },
//         {
//             name: "chat2222222222",
//             id: 2,
//         },
//         {
//             name: "chat3",
//             id: 3,
//         },
//     ],
// };

const initialState = {
    chatList: [
        // {
        //     name: "chat1",
        //     id: 1,
        // },
        // {
        //     name: "chat2222222222",
        //     id: 2,
        // },
        // {
        //     name: "chat3",
        //     id: 3,
        // },
    ],

    deleted: false,
};


export const chatListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CHAT:
            return {
                // в чем разница между спредингом стэйт и не спредингом стэйт здесь?
                ...state,
                chatList: [
                    ...state.chatList,
                    {
                        name: payload.name,
                        id: payload.id,
                    },
                ],
            };
        case DELETE_CHAT:
            // return state.chatList.filter(({ id }) => id !== payload.id);
            let newChat = state.chatList;
            newChat = newChat.filter(({ id }) => id !== payload.id);

            return {
                ...state,
                chatList: newChat,
            };
        case DELETED:
            return {
                ...state,
                deleted: payload.deleted
            };
        case CHANGE_CHAT_NAME:
            let chat = state.chatList;
            const chatId = state.chatList.findIndex((el) => el.id === payload.id);
            chat[chatId] = {
                name: payload.name,
                id: payload.id
            };
            return {
                ...state,
                chatList: chat,
            };
        case SET_CHATS:
            return {
                ...state,
                chatList: payload.chats,
            }
        default:
            return state;
    };
};

