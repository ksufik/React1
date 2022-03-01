export const CHANGE_NAME = "PROFILE_CHANGE_NAME";
export const SIGN_IN = "PROFILE_SIGN_IN";
export const SIGN_OUT = "PROFILE_SIGN_OUT";


// action creators - “создатели экшенов” - функция возвращает новый объект экшена с переданными ей данными
export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload:
    {
        name: newName,
    }
});

export const signIn = () => ({
    type: SIGN_IN,
});

export const signOut = () => ({
    type: SIGN_OUT,
});