import React, { useRef, useState } from 'react';
import './Form.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';

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
                author: "user",
                text: value,
                id: `${Date.now()}`
            });
        }

        //вариант 1
        inputRef.current?.focus();
        setValue('');
    }

    return (
        <>
            {/* <form className='form' onSubmit={handleSubmit}>
                <input className='form__input' type="text" value={value} placeholder='Введите сообщение' onChange={handleChange} />
                <div>
                    <input className='form__submit' type="submit" />
                </div>
            </form> */}

            <form id="myform" className='form' onSubmit={handleSubmit}>
                <FormControl>
                    <InputLabel htmlFor="my-input">Введите сообщение</InputLabel>
                    {/* вариант 2 */}
                    <Input autoFocus={true} type="text" value={value} onChange={handleChange} inputRef={inputRef} id="my-input" />
                    <Button type='submit' form="myform">Отправить</Button>


                </FormControl>
            </form>
        </>
    )
}