import React, { useRef, useState, useEffect, useCallback } from 'react';
import { addMessage, addMessageWithReply, changeMessage, isChangingMessage } from "../../store/messages/actions"
import { useSelector, useDispatch } from "react-redux";
import { AUTHORS } from '../../utils/constants';
import { getIsChange } from '../../store/messages/selectors'
import './Form.sass';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import { auth, getMessageRefById, getMsgsRefByChatId, messagesRef } from '../../services/firebase';
import { onChildAdded, onValue, push, set } from "firebase/database";
import { getProfileName } from '../../store/profile/selectors';


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

    const [msgId, setMsgId] = useState();

    useEffect(() => {
        const unsubscribe = onValue(getMsgsRefByChatId(chatId), (snapshot) => {
            // setChatMessages((prevMsgs) => [...prevMsgs, snapshot.val()]);
            // console.log('snapshot.val(): ', snapshot.val());
            // setChatMessages((prevMsgs) => [...prevMsgs, { [chatId]: snapshot.val() }]);
            //   setChatMessages([{ [chatId]: snapshot.val() }]);
            // setChatMessages([snapshot.val()]);
            console.log('snapshot.val(): ', snapshot.val());


            //     setTimeout(() => {
            //         setChatMessages(prevMsgs => [...prevMsgs, {
            //             id: Date.now() + Math.ceil(Math.random() * 100),
            //             author: AUTHORS.bot,
            //             text: 'Вам ответит первый освободившийся оператор.'
            //         }]);
            //     }, 1500);
        });

        return unsubscribe;
    }, [chatId]);



    const userName = useSelector(getProfileName);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (value !== '') {
            const newMsg = {
                author: auth.currentUser.uid,
                //  author: userName,
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

    //изменение текста сообщения
    const handleChangeMessage = (e) => {
        e.preventDefault();
        console.log('changeMessageFlag1 ', changeMessageFlag);
        // dispatch(changeMessage(chatId, changeMessageFlag.changeId, "edited text"));
        // dispatch(isChangingMessage(false, null));

        if (changeMessageFlag.change) {
            console.log(getMessageRefById(chatId, changeMessageFlag.changeId));
            //   setValue(getMessageRefById(chatId, changeMessageFlag.changeId));
        }
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