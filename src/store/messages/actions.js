export const ADD_MESSAGE = "MESSAGES_ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES_DELETE_MESSAGE";

export const addMessage = (chatId, author, text) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        author,
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