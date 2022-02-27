//вар1
//export const selectChats = (state) => state.chats;


//вар2
export function getProfileName(state) {
    return state.profile.name;
}
export const selectAuth = (state) => state.profile.authed;