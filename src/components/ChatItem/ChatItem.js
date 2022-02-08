// Chats
import { MessagesList } from '../MessageList/MessageList';
import { Form } from '../Form/Form';
import { AUTHORS } from '../../utils/constants.js'
import { useCallback, useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate, useParams, useRoutes } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleted } from "../../store/chatList/actions"
import './ChatItem.sass'


export function ChatItem({ chatMessages, setChatMessages }) {

    // const [messages, setMessages] = useState([]);

    // const handleSendMessage = useCallback((newMessage) => {
    //     setMessages(prevM => [...prevM, newMessage]);
    // }, []);

    // useEffect(() => {
    // messages[messages.length - 1]?.author === "user"
    //     if (messages.length && messages[messages.length - 1].author !== "user") {
    //         const bot = {
    //             author: "bot",
    //             text: 'Вам ответит первый освободившийся оператор.',
    //             id: `${Date.now()}`
    //         }

    //         const timeout = setTimeout(() => handleSendMessage(bot), 1000);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [messages, handleSendMessage]);




    // Хук useParams предоставляет нам доступные параметры url и обеспечивает обновление компонента при их изменении
    const { chatId } = useParams();
    //???
    const parentRef = useRef();


    const handleSendMessage = useCallback((newMessage) => {
        setChatMessages((prevM) => ({
            ...prevM,
            [chatId]: [...prevM[chatId], newMessage]
        }));
    }, [chatId, setChatMessages]);

    useEffect(() => {

        // chatMessages[chatId].length && chatMessages[chatId][chatMessages[chatId].length - 1].author !== "bot"
        if (chatMessages[chatId]?.length && chatMessages[chatId][chatMessages[chatId]?.length - 1].author !== AUTHORS.bot) {

            const bot = {
                author: AUTHORS.bot,
                text: 'Вам ответит первый освободившийся оператор.',
                id: Date.now()
            }

            const timeout = setTimeout(() => handleSendMessage(bot), 1000);
            return () => clearTimeout(timeout);
        }
    }, [chatMessages, chatId]);

    const deletedFlag = useSelector(state => state.chatList.deleted);
    const dispatch = useDispatch();

    if (deletedFlag) {
        console.log(deletedFlag);
        //тут выдается ошибка "Cannot update a component (`App`) while rendering a different component (`ChatItem`)". Как исправить?
        dispatch(deleted(false));
        return <Navigate replace to="/chats" />;
    } else if (!chatMessages[chatId]) {
        return <Navigate replace to="/*" />;
    }

    return (
        <div ref={parentRef} className='chat__form'>
            {/* <MessagesList messages={chatMessages[chatId]}></MessagesList> */}
            <MessagesList></MessagesList>
            <Form onSendMessage={handleSendMessage} />
        </div>
        // </span>
    )
}