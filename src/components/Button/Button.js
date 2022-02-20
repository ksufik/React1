import "./Button.sass"


export function Button({ onPress, name, className, type, onChange }) {

    return (
        <input className={`button ${className}`} type={type} value={name} onChange={onChange} onClick={onPress} />
    )
}

