import { useEffect } from 'react';
import { AUTHORS } from '../../utils/constants';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Button } from '../Button/Button';
import { deleteMessage } from "../../store/messages/actions"
import { getMessages } from "../../store/messages/selectors";
import { getProfileName } from "../../store/profile/selectors";
import './MessageList.sass'



export function MessagesList({ chatId }) {
    useEffect(() => {
        console.log("messageList did mount");

        return () => console.log("messageList will unmount");
    }, []);


    //берем имя из стора
    //const profileName = useSelector(state => state.profile.name);
    //const messages = useSelector(state => state.messages.messageList);
    const dispatch = useDispatch();


    const profileName = useSelector(getProfileName);
    const messages = useSelector(getMessages, shallowEqual);





    const handleDeleteMessage = (id) => {
        dispatch(deleteMessage(chatId, id));
    }


    return <div className="messageList">
        {messages[chatId].map(message => {
            return (
                <div key={message.id} className={`${message.author === AUTHORS.user ? "messageList__item" : "messageList__item bot"}`}>
                    <div className="messageList__author">{message.author === AUTHORS.user ? profileName : message.author}
                    </div>
                    <div className="messageList__text">{message.text}</div>
                    {message.author === AUTHORS.user && <Button name={"Удалить"} inputType="button" onPress={() => handleDeleteMessage(message.id)}></Button>}
                </div>
            )
        }
        )
        }
    </div>
}