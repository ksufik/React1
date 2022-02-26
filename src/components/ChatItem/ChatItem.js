// Chats
import { MessagesList } from '../MessageList/MessageList';
// import { Form } from '../Form/Form with edited msg';
import { Form } from '../Form/Form';
import { useRef, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams, useRoutes } from "react-router";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { deleted } from "../../store/chatList/actions"
import './ChatItem.sass'
import { getDeleted } from "../../store/chatList/selectors";
import { getMessages } from "../../store/messages/selectors";


export function ChatItem({ chatList }) {



    // Хук useParams предоставляет нам доступные параметры url и обеспечивает обновление компонента при их изменении
    const { chatId } = useParams();
    //???
    const parentRef = useRef();
    // Автоматически обновляет данные в компоненте при их изменении в сторе, сравнивает ссылки на старые и на новые данные
    //const chatMessages = useSelector(state => state.messages.messageList);
    //const deletedFlag = useSelector(state => state.chatList.deleted);

    //функция для изменения данных в сторе
    const dispatch = useDispatch();




    // const chatMessages = useSelector(getMessages, shallowEqual);
    const deletedFlag = useSelector(getDeleted);


    const [chatMessages, setChatMessages] = useState([]);

    // const handleSendMessage = useCallback((newMessage) => {
    //     setChatMessages((prevM) => ({
    //         ...prevM,
    //         [chatId]: [...prevM[chatId], newMessage]
    //     }));
    // }, [chatId, setChatMessages]);


    // const handleSendMessage = (text) => {
    //     console.log(text);
    //     addMessage(chatId, text);
    // }

    // useEffect(() => {

    //     // chatMessages[chatId].length && chatMessages[chatId][chatMessages[chatId].length - 1].author !== "bot"
    //     if (chatMessages[chatId]?.length && chatMessages[chatId][chatMessages[chatId]?.length - 1].author !== AUTHORS.bot) {

    //         const bot = {
    //             author: AUTHORS.bot,
    //             text: 'Вам ответит первый освободившийся оператор.',
    //             id: Date.now()
    //         }

    //         const timeout = setTimeout(() => handleSendMessage(bot), 1000);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [chatMessages, chatId]);

    useEffect(() => {
        if (deletedFlag) {
            dispatch(deleted(false));
        }

    }, [deletedFlag]);

    if (deletedFlag) {
        //Диспатч работает корректно, но после этого действия опять идет проверка deletedFlag и перенаправляет на 404
        // Как исправить?
        // dispatch(deleted(false));
        return <Navigate replace to="/chats" />;
    }
    // else if (!chatMessages[chatId]) {
    //     return <Navigate replace to="/*" />;
    // }
    // else if (!chatList[chatId] || !chatMessages) {
    //     return <Navigate replace to="/*" />;
    // }

    return (
        <div ref={parentRef} className='chat__form'>
            {/* <MessagesList messages={chatMessages[chatId] }></MessagesList> */}
            <MessagesList
                chatId={chatId}
                messages={chatMessages}
                setMessages={setChatMessages}
            ></MessagesList>
            {/* <Form onSendMessage={() => handleSendMessage()} /> */}
            {/* <Form chatMessages={chatMessages} chatId={chatId} /> */}
            <Form chatId={chatId} chatMessages={chatMessages} setChatMessages={setChatMessages} />
        </div>

    )
}