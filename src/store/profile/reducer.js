import { PROFILE_CHECKBOX, CHANGE_NAME } from "./actions";


const initialState = {
    checkbox: false,
    name: "Profile name"
}
//деструктуризация { type, payload }
export const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_CHECKBOX:
            return {
                ...state,
                checkbox: !state.checkbox
            }
        case CHANGE_NAME:
            return {
                state,
                name: payload
            }
        default:
            return state;
    }
}
