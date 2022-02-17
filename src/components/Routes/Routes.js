import { Home } from '../Home/Home';
import { ChatList } from '../ChatList/ChatList';
import { ChatItem } from '../ChatItem/ChatItem';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Profile } from '../Profile/Profile';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Navigate } from "react-router";
import { Anime } from '../Anime/Anime';

export function RoutesComponent() {

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
                    <li>
                        <Link className="App__link" to="/anime">Anime</Link>
                    </li>
                </ul>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="anime" element={<Anime />} />
                    {/* вложенные руты начинаются с react-router-dom 6 */}
                    <Route path="chats" element={<ChatList />} >
                        {/* <Route index /> */}
                        <Route path=":chatId" element={<ChatItem />} />
                    </Route>
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div >
        </BrowserRouter >

    )
}