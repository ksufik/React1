import { onValue, set } from "firebase/database";
import { chatsRef, getChatRefById, getMsgsListRefById } from "../../services/firebase";

export const ADD_CHAT = "CHATLIST_ADD_CHAT";
export const DELETE_CHAT = "CHATLIST_DELETE_CHAT";
export const DELETED = "CHATLIST_DELETED";
export const CHANGE_CHAT_NAME = "CHATLIST_CHANGE_CHAT_NAME";
export const SET_CHATS = "CHATLIST_SET_CHATS";

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

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: {
        chats,
    }
})

export const addChatWithFb = (newChat) => (dispatch) => {
    set(getMsgsListRefById(newChat.id), { empty: true });
    set(getChatRefById(newChat.id), newChat);
};

export const initChatsTracking = () => (dispatch) => {
    onValue(chatsRef, (chatsSnap) => {
        console.log(chatsSnap);
        const newChats = [];

        chatsSnap.forEach((snapshot) => {
            newChats.push(snapshot.val());
        });

        dispatch(setChats(newChats));
    });
};