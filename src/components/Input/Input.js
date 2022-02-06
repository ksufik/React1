import "./Input.sass"
export function Input({ placeholder, value, handleChange }) {

    // const [value, setValue] = useState('');

    // const handleChange = (e) => {
    //     setValue(e.target.value);
    // }

    return (
        <input className="input" value={value} onChange={handleChange} placeholder={placeholder}></input>
    )
}