import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCt16Yuh3Rs5P2IKemc0e5ejhNx-2y6Dbg",
    authDomain: "msngr-with-react.firebaseapp.com",
    projectId: "msngr-with-react",
    storageBucket: "msngr-with-react.appspot.com",
    messagingSenderId: "555529133688",
    appId: "1:555529133688:web:bd32d51888ef140f0a178d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const register = async (email, pass) => await createUserWithEmailAndPassword(auth, email, pass);
export const logIn = async (email, pass) => await signInWithEmailAndPassword(auth, email, pass);
export const logOut = async () => await signOut(auth);

export const database = getDatabase(app);
//если не передавать 2й аргумент, то мы будем следить за всей бд (чаты, сообщения, данные пользователя)
//здесь мы следим за данными пользователя
export const userRef = ref(database, 'user');

export const chatsRef = ref(database, 'chatList');
export const getChatRefById = (id) => ref(database, `chatList/${id}`);

export const messagesRef = ref(database, 'messageList');
//здесь будет храниться св-во changed
//getMessagesRefByChatId
export const getMsgsListRefByChatId = (chatId) => ref(database, `messageList/${chatId}`);
// getMessageListRefByChatId
export const getMsgsRefByChatId = (chatId) => ref(database, `messageList/${chatId}/messages`);
export const getMessageRefById = (chatId, msgId) =>
    ref(database, `messageList/${chatId}/messages/${msgId}`);
