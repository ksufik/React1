import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../store/profile/actions";
import { store } from "../../store/index"

export function Profile() {
    // const state = store.getState();

    // почему так не работает?
    // const { checkbox, name } = useSelector(state => state);
    const checkbox = useSelector(state => state.checkbox);
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();


    const handleChange = () => {
        dispatch(profileAction);
    }

    return (
        <div>
            <h1>Profile page</h1>
            <input
                type="checkbox"
                // checked={state.checkbox}
                checked={checkbox}
                // value={name}
                onChange={handleChange}
            />
            {/* <span>{state.name}</span> */}
            <span>{name}</span>
        </div>
    )
}