import './App.sass';
import { Home } from './components/Home/Home';
import { ChatList } from './components/ChatList/ChatList';
import { ChatItem } from './components/ChatItem/ChatItem';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Profile } from './components/Profile/Profile';
import { Provider } from "react-redux"
import { store } from "./store/index"
import { AUTHORS } from './utils/constants.js'
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Navigate } from "react-router";

// фигурные скобки обязательны, иначе не работает
function App() {

  // содержащиеся в чатах сообщения
  const initialMessages = {
    1: [
      {
        author: AUTHORS.user,
        text: "text1",
        id: Date.now()
      },
      {
        author: AUTHORS.user,
        text: "text1test",
        id: Date.now() + Math.ceil(Math.random() * 10)
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

  // const [chatMessages, setChatMessages] = useState(initialMessages);
  // const [deleted, setDeleted] = useState(false);

  // // удаление чата и сообщений 
  // const deleteChat = useCallback((deletingId) => {

  //   setDeleted(true);
  //   setChatList((prevChatList) =>
  //     prevChatList.filter(el => el.id !== deletingId)
  //   );
  //   // не поняла, как сделать удаление сообщений правильно
  //   setChatMessages((prevMessages) => {

  //     // prevMessages.filter(el => el.id !== deletingId)

  //     const newMessages = prevMessages;
  //     // newMessages.splice(newMessages.deletingId, 1);
  //     // return newMessages;

  //     delete newMessages[deletingId];
  //     return newMessages;
  //   });
  //   console.log(chatList);
  //   console.log(chatMessages);



  // }, [chatList]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <ul className="App__ul">
            <li>
              <Link className="App__link" to="/">Home</Link>
            </li>
            <li>
              <Link className="App__link" to="/chats">Chats</Link>
            </li>
            <li>
              <Link className="App__link" to="/profile">Profile</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<Home />} />
            {/* вложенные руты начинаются с react-router-dom 6 */}
            <Route path="chats" element={<ChatList />} >
              {/* <Route index /> */}
              {/* <Route path=":chatId" element={<ChatItem chatMessages={chatMessages} setChatMessages={setChatMessages} deleted={deleted} setDeleted={setDeleted} />} /> */}
              {/* <Route path=":chatId" element={<ChatItem />} /> */}
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div >
      </BrowserRouter >
    </Provider>
  );
}

export default App;
