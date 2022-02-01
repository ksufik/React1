import React, { useEffect, useRef, useState } from 'react';
import './Form.sass';
import { AUTHORS } from '../../utils/constants.js'
// import { Button, InputLabel, Input, FormControl } from '@material-ui/core';

export const Form = ({ onSendMessage }) => {
    const [value, setValue] = useState('');
    // ругается на inputRef
    // const inputRef = useRef();

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
        setValue('');
    }

    // useEffect(() => {
    //     //вариант 1
    //     inputRef.current.focus();
    // }, [])

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <input className='form__input' type="text" value={value}
                    // inputRef={inputRef} 
                    placeholder='Введите сообщение' onChange={handleChange} />
                <div>
                    <input className='form__submit' type="submit" />
                </div>
            </form>

            {/* <form id="myform" className='form' onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Введите сообщение</InputLabel>
            <Input autoFocus={true} type="text" value={value} onChange={handleChange} inputRef={inputRef} id="my-input" />
            <Button type='submit' form="myform">Отправить</Button>


        </FormControl>
            </form > */}
        </>
    )
}