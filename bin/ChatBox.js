// src/ChatBox.js
import React, { useState } from 'react';

const ChatBox = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ChatBox;