import { useCallback, useState, useEffect } from 'react';
import './App.css';
import { MessagesList } from './components/MessageList';
import { Form } from './components/Form';
import { ListComp } from './components/List';


// фигурные скобки обязательны, иначе не работает
function App() {

  const [messages, setMessages] = useState([]);

  //так и не поняла useCallback
  const handleSendMessage = useCallback((newMessage) => {
    setMessages(prevM => [...prevM, newMessage]);
  }, []);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].author === "user") {
      const bot = {
        author: "bot",
        text: 'Вам ответит первый освободившийся оператор.',
        id: `${Date.now()}`
      }

      const timeout = setTimeout(() => handleSendMessage(bot), 1000);
      return () => clearTimeout(timeout);
    }
  }, [messages, handleSendMessage]);

  return (
    <div className="App">
      <header className="App-header">
        Чат
      </header >
      <div className='flex'>
        <ListComp />
        <div className='chat__form'>
          <MessagesList messages={messages} />
          <Form onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
