import { useCallback, useState, useEffect } from 'react';
import './App.sass';
import { Home } from './components/Home/Home';
import { ChatList } from './components/ChatList/ChatList';
import { ChatItem } from './components/ChatItem/ChatItem';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Profile } from './components/Profile/Profile';


// фигурные скобки обязательны, иначе не работает
function App() {


  return (

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

        {/* <div className="App">
        <header className="App-header">
        </header >
        <div className='flex'>
          <List />
        </div>
      </div> */}

        <Routes>
          <Route path="/" element={<Home />} />
          {/* вложенные руты начинаются с react-router-dom 6 */}
          <Route path="chats">
            <Route index element={<ChatList />} />
            <Route path=":chatId" element={<ChatItem />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div >
    </BrowserRouter >

  );
}

export default App;
