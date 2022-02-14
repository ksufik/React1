export const ADD_CHAT = "CHATLIST_ADD_CHAT";
export const DELETE_CHAT = "CHATLIST_DELETE_CHAT";
export const DELETED = "CHATLIST_DELETED";
export const CHANGE_CHAT_NAME = "CHATLIST_CHANGE_CHAT_NAME";

export const addChat = (name) => ({
    type: ADD_CHAT,
    payload: {
        name,
        id: Date.now() + Math.ceil(Math.random() * 100),
    }
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

export const changeChatName = (id, newName) => ({
    type: CHANGE_CHAT_NAME,
    payload: {
        id: id,
        name: newName
    }
});