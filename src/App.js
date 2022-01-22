import { useCallback, useState, useEffect } from 'react';
import './App.css';
import { MessagesList } from './components/MessageList';
import { Form } from './components/Form';
import { AUTHORS } from './utils/constants';

// фигурные скобки обязательны, иначе не работает
function App() {

  const [messages, setMessages] = useState([]);

  //так и не поняла useCallback
  const handleSendMessage = useCallback((newMessage) => {
    setMessages(prevM => [...prevM, newMessage]);
  }, []);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].author === AUTHORS.user) {
      const bot = {
        author: AUTHORS.bot,
        text: 'Вам ответит первый освободившийся оператор.',
        check: false,
        id: `${Date.now()}`
      }

      setTimeout(() => handleSendMessage(bot), 1000);
    }
    // терминал выдавал warning: "React Hook useEffect has a missing dependency: 'handleSendMessage'". Обязательно ли писать handleSendMessage?
  }, [messages, handleSendMessage]);

  return (
    <div className="App">
      <header className="App-header">
      </header >
      <MessagesList messages={messages} />
      <Form onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
