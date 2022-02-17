export const PROFILE_CHECKBOX = "PROFILE_CHECKBOX";
export const CHANGE_NAME = "PROFILE_CHANGE_NAME";

export const profileCheckbox = {
    type: PROFILE_CHECKBOX
}

// action creators - “создатели экшенов” - функция возвращает новый объект экшена с переданными ей данными
export const changeName = (newName) => ({
    type: CHANGE_NAME,
    payload: newName
});