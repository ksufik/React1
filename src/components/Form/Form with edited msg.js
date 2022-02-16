import React, { useRef, useState, useEffect, useCallback } from 'react';
import { addMessage, addMessageWithReply, changeMessage, isChangingMessage } from "../../store/messages/actions"
import { useSelector, useDispatch } from "react-redux";
import { AUTHORS } from '../../utils/constants';
import { getIsChange } from '../../store/messages/selectors'
import './Form.sass';
import { Button } from '../Button/Button';
import { Message } from '../Message/Message';


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
            dispatch(addMessage(chatId, user));
            // sendMessage(user);
        }

        inputRef.current?.focus();
        setValue('');
    }

    const sendMessage = useCallback((newMessage) => {
        dispatch(addMessageWithReply(chatId, newMessage));
    }, [chatId, addMessageWithReply])



    //изменение текста сообщения
    const handleChangeMessage = (e) => {
        e.preventDefault();
        console.log('changeMessageFlag1 ', changeMessageFlag);
        // dispatch(changeMessage(key1, key2, chatMessages[key1][key2]))
        dispatch(changeMessage(chatId, changeMessageFlag.changeId, "edited text"));
        // console.log(`chatId: ${chatId}, changeMessageFlag.changeId: ${changeMessageFlag.changeId}, newText: ${"edited text"}`);
        dispatch(isChangingMessage(false, null));
    }




    return (
        <>
            <form className='form' onSubmit={handleChangeMessage}>
                <input className='form__input' type="text" value={value}
                    ref={inputRef}
                    placeholder='Введите сообщение' onChange={handleChange}>
                </input>
                <div>
                    <Button name='Подтвердить изменение' type='button' addStyle="button__mt20" onChange={handleChange} onPress={handleChangeMessage}></Button>
                </div>
            </form>

            <Message chatId={chatId} idToChange={changeMessageFlag.changeId} newText={"edited text"}></Message>
        </>
    )
}