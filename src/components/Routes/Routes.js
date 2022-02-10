import { Home } from '../Home/Home';
import { ChatList } from '../ChatList/ChatList';
import { ChatItem } from '../ChatItem/ChatItem';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Profile } from '../Profile/Profile';
import { Provider } from "react-redux"
import { store } from '../../store';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Navigate } from "react-router";

export function RoutesComponent() {

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
                            <Route path=":chatId" element={<ChatItem />} />
                        </Route>
                        <Route path="profile" element={<Profile />} />
                        <Route path="*" element={<h1>404</h1>} />
                    </Routes>
                </div >
            </BrowserRouter >
        </Provider>
    )
}