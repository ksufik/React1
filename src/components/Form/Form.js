import React, { useRef, useState, useEffect, useCallback } from 'react';
import { addMessage, addMessageWithReply, changeMessage, isChangingMessage } from "../../store/messages/actions"
import { useSelector, useDispatch } from "react-redux";
import { AUTHORS } from '../../utils/constants';
import { getIsChange } from '../../store/messages/selectors'
import './Form.sass';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import { getMessageRefById, getMsgsRefByChatId, messagesRef } from '../../services/firebase';
import { onChildAdded, push, set } from "firebase/database";


export const Form = ({ chatId, chatMessages, setChatMessages }) => {
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


    const newId = Date.now() + Math.ceil(Math.random() * 100);

    useEffect(() => {
        const unsubscribe = onChildAdded(getMsgsRefByChatId(chatId), (snapshot) => {
            setChatMessages((prevMsgs) => [...prevMsgs, snapshot.val()]);


            setTimeout(() => {
                setChatMessages(prevMsgs => [...prevMsgs, {
                    id: Date.now() + Math.ceil(Math.random() * 100),
                    author: AUTHORS.bot,
                    text: 'Вам ответит первый освободившийся оператор.'
                }]);
            }, 1500);
        });

        return unsubscribe;
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (value !== '') {
            const newMsg = {
                author: AUTHORS.user,
                text: value,
                id: Date.now() + Math.ceil(Math.random() * 100),
            };
            //   dispatch(addMessageWithReply(chatId, newMsg));
            //   push(getMsgsRefById(chatId), newMsg);
            set(getMessageRefById(chatId, newMsg.id), newMsg);
        }




        inputRef.current?.focus();
        setValue('');
    }

    //доступ  к тексту сообщения для изменения(не использую)
    // let [key2, setKey2] = useState();
    // let [key1, setKey1] = useState();

    // useEffect(() => {
    //     console.log('value: ', value)
    //     if (value) {
    //         setKey1(0);
    //         setKey2(undefined);
    //         for (key1 in chatMessages) {
    //             key2 = (chatMessages[key1].findIndex((el) => el.id === changeMessageFlag.changeId));
    //             if (key2 !== undefined && key2 !== -1) {
    //                 setKey1(key1);
    //                 setKey2(key2);
    //                 console.log('text', chatMessages[key1][key2].text);
    //                 break;
    //             }
    //         }
    //         setValue(chatMessages[key1][key2].text);
    //     }
    // }, [changeMessageFlag])

    //изменение текста сообщения
    const handleChangeMessage = (e) => {
        e.preventDefault();
        console.log('changeMessageFlag1 ', changeMessageFlag);
        dispatch(changeMessage(chatId, changeMessageFlag.changeId, "edited text"));
        // dispatch(changeMessage(key1, key2, chatMessages[key1][key2]))
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
                <Input className='input__form' type="text" value={value}
                    inputRef={inputRef}
                    placeholder='Введите сообщение' onChange={handleChange} />

                {/* {changeMessageFlag.change ?  : */}
                <Button className='button__mt20 button__submit' type="submit" value='Отправить' />
                <Button value='Подтвердить изменение' type='button' className="button__mt20 button__submit" onClick={handleChangeMessage}></Button>
            </form>
        </>
    )
}