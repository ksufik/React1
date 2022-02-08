export const ADD_MESSAGE = "MESSAGES_ADD_CHAT";
export const DELETE_MESSAGE = "MESSAGES_DELETE_MESSAGE";

export const addMessage = (chatId, text) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        text,
    }
});

export const deleteMessage = (chatId, deletingId) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        deletingId,
    },
});