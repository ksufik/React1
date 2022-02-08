import "./Button.sass"


export function Button({ label, onPress, name, addStyle, inputType }) {

    //label для чего-то отличающегося от стандартного названия
    return (
        //
        <input className={`button ${addStyle}`} type={inputType} value={name} onClick={onPress} />
    )
}

