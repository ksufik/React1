import { RoutesComponent } from './components/Routes/Routes'

import './App.sass';


// фигурные скобки обязательны, иначе не работает
function App() {

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

  return <RoutesComponent />


}

export default App;
