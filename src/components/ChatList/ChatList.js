//ChatList
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import './ChatList.sass'
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { addChat, deleteChat, deleted, changeChatName, initChatsTracking, addChatWithFb } from "../../store/chatList/actions"
import { getChatList } from "../../store/chatList/selectors";
import { onChildAdded, onChildRemoved, onValue, remove, set, onChildChanged } from "firebase/database";
import { chatsRef, getChatRefById } from "../../services/firebase";



export function ChatList() {

    //с использованием хука, но у него есть минусы:
    // Повторение кода (селектор для имени профиля используется дважды в разных компонентах, и каждый раз создается новая стрелочная функция)
    // react-redux не может закэшировать результат вызова селектора, т.к. функция-селектор каждый раз создается заново

    //const chats = useSelector(state => state.chatList.chatList);
    const dispatch = useDispatch();

    //С использование selectors
    //shallowEqual - т.к. в UseSelectors используется ссылочное сравнение старых и новых данных, иногда компонент может обновляться лишний раз
    //shallowEqual - функция для поверхностного сравнения двух значений(старого и нового) и лишний раз не вызывается)
    const chats = useSelector(getChatList, shallowEqual);

    //для показа модального окна
    const [modalIsShown, setModalIsShown] = useState(false);
    const modalCkickHandler = () => {
        setModalIsShown(!modalIsShown);
    }

    const [chatList, setChatList] = useState([]);

    //для показа инпута
    const [addInputIsShown, setAddInputIsShown] = useState(false);
    const [changeInputIsShown, setChangeInputIsShown] = useState(false);


    const [value, setValue] = useState('');
    const [chatName, setChatName] = useState('');

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    }

    const handleChangeName = (e) => {
        setChatName(e.target.value);
    }

    const inputRef = useRef();

    useEffect(() => {
        //snapshot - коллбэк, который будет отрабатывать каждый раз при изменении chatsRef
        //snapshot - это обертка, ближе в бд
        //onValue - слушатель изменения значения по адресу (chatsRef)
        //onChildAdded - будет вызываться исключительно при добавлении нового дочернего элемента в chatsRef
        const unsubscribe = onChildAdded(chatsRef, (chatsSnap) => {
            //onValue
            //   const newChats = [];
            // chatsSnap.forEach((child) => {
            //     newChats.push(child.val());
            // });
            // setChatList(newChats);

            //onChildAdded
            setChatList(prevChats => [...prevChats, chatsSnap.val()]);
        })

        return unsubscribe;
    }, []);

    const handleAddChat = (e) => {
        e.preventDefault();

        setAddInputIsShown(!addInputIsShown);

        const newId = Date.now() + Math.ceil(Math.random() * 100);
        if (value !== '') {
            //  dispatch(addChat(value));
            set(getChatRefById(newId), { id: newId, name: value });
            //   set(getMsgsListRefByChatId(newId), {empty: true});

        }

        setValue('');
        inputRef.current?.focus();
    }

    useEffect(() => {
        const unsubscribe = onChildRemoved(chatsRef, (chatsSnap) => {
            setChatList(prevChats => prevChats.filter(({ id }) => id !== chatsSnap.val()?.id));
        })

        return unsubscribe;
    }, []);

    const handleDeleteChat = (id) => {
        dispatch(deleted(true));
        // dispatch(deleteChat(id));
        // set(getChatRefById(id), null);
        remove(getChatRefById(id));
    }

    useEffect(() => {
        const unsubscribe = onChildChanged(chatsRef, (chatsSnap) => {
            const changingChat = chatList.findIndex((el) => el.id === chatsSnap.val().id);
            console.log('chatList2: ', chatList);
            //     setChatList(chatList[changingChat] = {
            //     id: chatsSnap.val().id,
            //     name: chatsSnap.val().name,
            // });
            // setChatList(prevChats => prevChats.findIndex((el) => el.id === chatsSnap.val().id));
            console.log('val: ', chatsSnap.val());

        })

        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log('chatList: ', chatList);
    }, [chatList])

    const handleChangeChatName = (id) => {
        setChangeInputIsShown(!changeInputIsShown);
        if (chatName !== '') {
            //  dispatch(changeChatName(id, chatName));
            set(getChatRefById(id), { id: id, name: chatName });
        }
        setChatName('');
    }




    return (
        <>
            <div className="flex">
                <ul className="list">
                    <h3>Список чатов</h3>
                    {chatList.map(chat => (
                        <span key={chat.id}>
                            <li className="list__li">
                                <NavLink className="list__link"
                                    style={({ isActive }) => ({ className: isActive ? "active" : "" })}
                                    to={`/chats/${chat.id}`} >
                                    {chat.name}
                                </NavLink>
                                <div className="list__modal" >
                                    <div className="list__modal__mark" onClick={modalCkickHandler} >:
                                    </div>
                                    <ModalWindow active={modalIsShown} item={chat.id}></ModalWindow>

                                </div>
                                <Button value={"Удалить"} type="button" onClick={() => handleDeleteChat(chat.id)}></Button>

                                <Button value={changeInputIsShown && chatName === "" ? "Скрыть форму" : "Изменить название"} type="button" onClick={() => handleChangeChatName(chat.id)}></Button>
                                {changeInputIsShown && <Input placeholder='Впишите название чата' value={chatName} onChange={handleChangeName} ></Input>}

                            </li>
                        </span>
                    ))}
                    <form onSubmit={handleAddChat}>
                        <Button className="button__mt20" type="submit" value={addInputIsShown && value === "" ? "Скрыть форму" : "Добавить"}></Button>
                        <div className="list__input">
                            {addInputIsShown && <Input placeholder='Впишите название чата' value={value} onChange={handleChangeValue} />}
                        </div>
                    </form>
                    {/* onPress={() => handleAddChat} */}
                </ul>
                <Outlet />
            </div>

        </>
    )
}