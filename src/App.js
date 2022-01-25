import { useState } from 'react';
import './App.css';
import Message from './components/Message';

// фигурные скобки обязательны, иначе не работает
function App({ name }) {
  const text1 = 'Мое первое приложение на Реакте'
  const bol = true
  const [textColor, setTextColor] = useState({ text: 'Желтый', color: bol })
  const [text2, setText2] = useState(true)


  const handleClick = () => {
    setTextColor({ text: 'Зеленый', color: !bol })
    setText2(!text2)
  }

  return (
    <div className="App">
      <header className="App-header">
        My first React App
        <h3>Hello, {name}!</h3>
        <Message message1={text1} changeText={textColor} changeColor={text2} onMessageClick={handleClick} />
      </header >
    </div>
  );
}

export default App;
