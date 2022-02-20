import { Home } from '../Home/Home';
import { ChatList } from '../ChatList/ChatList';
import { ChatItem } from '../ChatItem/ChatItem';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Profile } from '../Profile/Profile';
import { useEffect } from 'react';
import { Anime } from '../Anime/Anime';
import { SignUp } from '../SingUp/SignUp';
import { auth } from '../../services/firebase'
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../../store/profile/actions';
import { PrivateRoute } from '../PrivateRoute';

export function RoutesComponent() {
    const dispatch = useDispatch();
    //подписка делается на самом верхнем уровне
    // const [msgs, setMsgs] = useState({});

    // useEffect(() => {
    //     onValue(messagesRef, (snapshot) => {
    //         const newMsgs = {};

    //         snapshot.forEach((chatMsgsSnap) => {
    //             newMsgs[chatMsgsSnap.key] = Object.values(
    //                 chatMsgsSnap.val().messageList || {}
    //             );
    //         });

    //         setMsgs(newMsgs);
    //     });
    // }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(signIn());
            } else {
                dispatch(signOut());
            }
        })
        //размонтирование
        return unsubscribe;
    }, [])

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
                    <Route path="/" element={<Home />}>
                    </Route>
                    <Route path="signup" element={<SignUp />} />
                    <Route path="anime" element={<Anime />} />
                    {/* вложенные руты начинаются с react-router-dom 6 */}
                    <Route path="chats" element={
                        <PrivateRoute>
                            <ChatList />
                        </PrivateRoute>} >
                        {/* <Route index /> */}
                        <Route path=":chatId" element={
                            <PrivateRoute>
                                <ChatItem />
                            </PrivateRoute>
                        } />
                    </Route>
                    <Route path="profile" element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </div >
        </BrowserRouter >

    )
}