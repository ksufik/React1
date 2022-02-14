import "./Button.sass"


export function Button({ onPress, name, addStyle, inputType, onChange }) {

    return (
        <input className={`button ${addStyle}`} type={inputType} value={name} onChange={onChange} onClick={onPress} />
    )
}

