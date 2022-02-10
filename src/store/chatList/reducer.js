import { ADD_CHAT, DELETE_CHAT, DELETED } from "./actions";

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
        {
            name: "chat1",
            id: 1,
        },
        {
            name: "chat2222222222",
            id: 2,
        },
        {
            name: "chat3",
            id: 3,
        },
    ],

    deleted: false,
};


export const chatListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CHAT:
            // return [
            //     //тут я копирую уже имеющиеся чаты, правильно?
            //     ...state,
            //     {
            //         id: Date.now() + Math.ceil(Math.random() * 10),
            //         name: payload,
            //     },
            // ];
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
            }




        // ...state,
        //  chatList: [

        // state.chatList.filter(({ id }) => id !== payload.id)
        //  ],



        case DELETED:
            return {
                ...state,
                deleted: payload.deleted
            }
        default:
            return state;
    };
};

