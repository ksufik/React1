export const ADD_CHAT = "CHATLIST_ADD_CHAT";
export const DELETE_CHAT = "CHATLIST_DELETE_CHAT";
export const DELETED = "CHATLIST_DELETED";

export const addChat = (name) => ({
    type: ADD_CHAT,
    payload: name
});

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    payload: {
        id: id
    }
});

export const deleted = (newDeleted) => ({
    type: DELETED,
    payload: {
        deleted: newDeleted
    }
});