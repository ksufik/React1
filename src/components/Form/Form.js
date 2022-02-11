import React, { useRef, useState, useEffect } from 'react';
import { addMessageWithReply } from "../../store/messages/actions"
import { useSelector, useDispatch } from "react-redux";
import { AUTHORS } from '../../utils/constants';
import './Form.sass';


export const Form = ({ chatId, chatMessages }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef();

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            const user = {
                author: AUTHORS.user,
                text: value,
            };
            dispatch(addMessageWithReply(chatId, user));
        }

        //не работает
        inputRef.current?.focus();
        // autofocus?

        setValue('');
    }

    // useEffect(() => {

    //     // chatMessages[chatId].length && chatMessages[chatId][chatMessages[chatId].length - 1].author !== "bot"
    //     if (chatMessages[chatId]?.length && chatMessages[chatId][chatMessages[chatId]?.length - 1].author !== AUTHORS.bot) {

    //         // const bot = {
    //         //     author: AUTHORS.bot,
    //         //     text: 'Вам ответит первый освободившийся оператор.',
    //         //     id: Date.now()
    //         // }

    //         const timeout = setTimeout(() => dispatch(addMessage(chatId, AUTHORS.bot, 'Вам ответит первый освободившийся оператор.')), 1500);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [chatMessages, chatId]);


    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <input className='form__input' type="text" value={value}
                    ref={inputRef}
                    placeholder='Введите сообщение' onChange={handleChange} />
                <div>
                    <input className='form__submit' type="submit" />
                </div>
            </form>
        </>
    )
}