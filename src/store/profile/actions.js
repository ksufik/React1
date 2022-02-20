export const PROFILE_CHECKBOX = "PROFILE_CHECKBOX";
export const CHANGE_NAME = "PROFILE_CHANGE_NAME";
export const SIGN_IN = "PROFILE_SIGN_IN";
export const SIGN_OUT = "PROFILE_SIGN_OUT";

export const profileCheckbox = {
    type: PROFILE_CHECKBOX
}

// action creators - “создатели экшенов” - функция возвращает новый объект экшена с переданными ей данными
export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload: newName
});

export const signIn = () => ({
    type: SIGN_IN,
});

export const signOut = () => ({
    type: SIGN_OUT,
});