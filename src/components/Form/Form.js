import React, { useRef, useState } from 'react';
import './Form.sass';
import { AUTHORS } from '../../utils/constants.js'

export const Form = ({ onSendMessage }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            onSendMessage({
                author: AUTHORS.user,
                text: value,
                id: Date.now()
            });
        }

        //не работает
        inputRef.current?.focus();
        // autofocus?

        setValue('');
    }


    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <input className='form__input' type="text" value={value}
                    // ref={inputRef}
                    placeholder='Введите сообщение' onChange={handleChange} />
                <div>
                    <input className='form__submit' type="submit" />
                </div>
            </form>
        </>
    )
}