import "./Button.sass"


export function Button({ label, onPress, name, addStyle }) {

    //label для чего-то отличающегося от стандартного названия
    return (
        //
        <button className={`button ${addStyle}`} onClick={onPress}>{name}</button>
    )
}