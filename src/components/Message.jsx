import React from "react";
import './Message.css';


function Message({ message1, changeText, onMessageClick, changeColor }) {
    return (
        <div className="Message">
            <h4 className="Message__red">
                {message1}
            </h4>
            {/* <h2 className='Message__yellow' onClick={onMessageClick}>
                {message2}
            </h2> */}
            <h2 className={`${changeText.color ? 'Message__yellow' : 'Message__green'}`} onClick={onMessageClick}>
                {changeText.text}
                <div className={`${changeColor ? 'Message__yellow' : 'Message__green'}`}>text</div>
            </h2>

        </div>
    )
}

export default Message;