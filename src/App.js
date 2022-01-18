import { useState } from 'react';
import './App.css';
import Message from './components/Message';

// фигурные скобки обязательны, иначе не работает
function App({ name }) {
  const text1 = 'Мое первое приложение на Реакте'
  const [text2, setText2] = useState("Я - проп")

  // Пыталась сделать так, чтобы при клике менялся класс в Message с Message__yellow на green. Как это надо было сделать? В теории вроде понятно, а на практике не получилось.
  const handleClick = () => {
    setText2("I'm a prop")
  }

  return (
    <div className="App">
      <header className="App-header">
        My first React App
        <h3>Hello, {name}!</h3>
        <Message message1={text1} message2={text2} onMessageClick={handleClick} />
      </header >
    </div>
  );
}

export default App;
