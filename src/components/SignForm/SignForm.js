import { useState } from 'react'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'

export const SignForm = ({ onSubmit, error, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(email, password);
        setEmail('')
        setPassword('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input type="text" value={email} onChange={handleChangeEmail} />
            </div>
            <div>
                <Input type="password" value={password} currentPassword={password} onChange={handleChangePassword} />
            </div>
            <div>
                <Button type="submit" name="Подтвердить" disabled={loading} />
            </div>

            {error && <h4>{error}</h4>}
        </form>
    )
}