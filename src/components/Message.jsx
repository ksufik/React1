import React from "react";
import './Message.css';


function Message({ message1, message2, onMessageClick }) {
    return (
        <div className="Message">
            <h4 className="Message__red">
                {message1}
            </h4>
            <h2 className='Message__yellow' onClick={onMessageClick}>
                {message2}
            </h2>
            {/* <h2 className={`sidebar ${activeState ? 'active' : ''}`} onClick={onMessageClick}>
                {message2}
            </h2> */}
        </div>
    )
}

export default Message;