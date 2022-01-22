import React, { useState } from 'react';
import { AUTHORS } from '../utils/constants';
import './Form.css';

export const Form = ({ onSendMessage }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            onSendMessage({
                author: AUTHORS.user,
                text: value,
                check: true,
                id: `${Date.now()}`
            });
        }

        setValue('');
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input className='form__input' type="text" value={value} placeholder='Введите сообщение' onChange={handleChange} />
            <div>
                <input className='form__submit' type="submit" />
            </div>
        </form>
    )
}