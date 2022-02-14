import React, { useRef, useState, useEffect, useCallback } from 'react';
import { addMessage, addMessageWithReply, changeMessage, isChangingMessage } from "../../store/messages/actions"
import { useSelector, useDispatch } from "react-redux";
import { AUTHORS } from '../../utils/constants';
import { getIsChange } from '../../store/messages/selectors'
import './Form.sass';
import { Button } from '../Button/Button';


export const Form = ({ chatId, chatMessages }) => {
    let [value, setValue] = useState('');
    const inputRef = useRef();


    //undefined
    const changeMessageFlag = useSelector(getIsChange);

    //  const changeMessageFlag = useSelector(state => state.messages.change);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    // useEffect(() => {
    //     if (changeMessageFlag.change) {
    //         setValue(chatMessages[changeMessageFlag.changeId].text);
    //     }
    // }, [changeMessageFlag])

    useEffect(() => { inputRef.current?.focus() }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value !== '') {
            const user = {
                author: AUTHORS.user,
                text: value,
            };
            //ошибки с МиддлВаром
            dispatch(addMessageWithReply(chatId, user));
            // sendMessage(user);
        }

        inputRef.current?.focus();
        setValue('');
    }

    const sendMessage = useCallback((newMessage) => {
        dispatch(addMessageWithReply(chatId, newMessage));
    }, [chatId, addMessageWithReply])


    //доступ  к тексту сообщения для изменения
    let [key2, setKey2] = useState();
    let [key1, setKey1] = useState();

    useEffect(() => {
        console.log('value: ', value)
        if (value) {
            setKey1(0);
            setKey2(undefined);
            for (key1 in chatMessages) {
                key2 = (chatMessages[key1].findIndex((el) => el.id === changeMessageFlag.changeId));
                if (key2 !== undefined && key2 !== -1) {
                    setKey1(key1);
                    setKey2(key2);
                    console.log('text', chatMessages[key1][key2].text);
                    break;
                }
            }
            setValue(chatMessages[key1][key2].text);
        }
    }, [changeMessageFlag])

    //изменение текста сообщения
    const handleChangeMessage = (e) => {
        e.preventDefault();
        dispatch(changeMessage(key1, key2, chatMessages[key1][key2]))
        dispatch(isChangingMessage(false, null));
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
                    placeholder='Введите сообщение' onChange={handleChange}>
                </input>
                <div>
                    {/* {changeMessageFlag.change ? <Button name='Подтвердить изменение' type='button' addStyle="button__mt20" onChange={handleChange} onPress={handleChangeMessage}></Button> : */}
                    <input className='form__submit' type="submit" />
                    {/* } */}
                </div>
            </form>
        </>
    )
}