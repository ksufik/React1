import { PROFILE_ACTION } from "./actions";

const initialState = {
    checkbox: false,
    name: "Profile name"
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_ACTION:
            return {
                ...state,
                checkbox: !state.checkbox
            }
        default:
            return state
    }
}
