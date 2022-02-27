//вар1
//export const selectChats = (state) => state.chats;

//вар2
export function getMessages(state) {
    return state.messages.messageList;

}

export function getIsChange(state) {
    return state.messages.changed;

}
