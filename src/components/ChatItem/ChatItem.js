// Chats
import { MessagesList } from '../MessageList/MessageList';
import { ChatList } from '../ChatList/ChatList';
import { Form } from '../Form/Form';
import { AUTHORS } from '../../utils/constants.js'
import { useCallback, useState, useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate, useParams, useRoutes } from "react-router";


export function ChatItem() {

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




    // содержащиеся в чатах сообщения
    const initialMessages = {
        1: [
            {
                author: AUTHORS.user,
                text: "text1",
                id: Date.now()
            },
        ],
        2: [
            {
                author: AUTHORS.user,
                text: "this is chat2",
                id: Date.now()
            },
        ],
        3: [{
            author: AUTHORS.user,
            text: "text3",
            id: Date.now()
        },],
    };

    // Хук useParams предоставляет нам доступные параметры url и обеспечивает обновление компонента при их изменении
    const { chatId } = useParams();
    const parentRef = useRef();

    const [chatMessages, setChatMessages] = useState(initialMessages);

    const handleSendMessage = useCallback((newMessage) => {
        setChatMessages((prevM) => ({
            ...prevM,
            [chatId]: [...prevM[chatId], newMessage]
        }));
    }, [chatId]);

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
    }, [chatMessages, chatId, handleSendMessage]);

    if (!chatMessages[chatId]) {
        return <Navigate replace to="/*" />;
    }


    return (
        // <div className='chat__form'>
        //     <MessagesList messages={messages} />
        //     <Form onSendMessage={handleSendMessage} />
        // </div>
        <div ref={parentRef}>
            <ChatList />
            <div className='chat__form'>
                <MessagesList messages={chatMessages[chatId]}></MessagesList>
                <Form onSendMessage={handleSendMessage} />
            </div>
        </div>
    )

}