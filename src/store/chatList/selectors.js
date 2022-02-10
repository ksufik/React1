//вар1
// export const selectChats = (state) => state.chats;

//вар2
export function getChatList(state) {
    return state.chatList.chatList
}

export function getDeleted(state) {
    return state.chatList.deleted
}