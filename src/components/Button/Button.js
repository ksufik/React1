import "./Button.sass"


export function Button({ onPress, name, addStyle, inputType }) {

    return (
        <input className={`button ${addStyle}`} type={inputType} value={name} onClick={onPress} />
    )
}

