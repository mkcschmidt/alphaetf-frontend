import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Component for Dropdowns
const Dropdown = ({ label, options, onSelect, className }) => {
  return (
    <div className={`dropdown ${className}`}>
      <label className="dropdown-label">{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

// Component for the Chat Input
const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Chat with AlphaETF..."
        required
      />
      <button type="submit">
        <span>Send</span>
        <img src="icon1.png" alt="Send" />
      </button>
    </form>
  );
};

// Component for displaying messages
const MessageDisplay = ({ messages }) => {
  return (
    <div className="messages-display">
      {messages.map((msg, index) => (
        <div key={index} className="message-item">
          <p>{msg}</p>
        </div>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const sendMessageToAPI = async (newMessage) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });
      const data = await response.json();
      if (data.response) {
        setMessages(messages => [...messages, `You: ${newMessage}`, `AlphaETF: ${data.response}`]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };  

  const onSendMessage = (newMessage) => {
    sendMessageToAPI(newMessage);
  };

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const assetClassOptions = ['Stocks', 'Bonds', 'Commodities'];
  const investmentFocusOptions = ['Technology', 'Healthcare', 'Finance'];
  const etfsOptions = ['S&P 500 ETF', 'Nasdaq ETF', 'Emerging Markets ETF'];

  const [assetClass, setAssetClass] = useState(assetClassOptions[0]);
  const [investmentFocus, setInvestmentFocus] = useState(investmentFocusOptions[0]);
  const [etfs, setEtfs] = useState(etfsOptions[0]);

  const logo = '/logo.png';

  return (
    <div className="app">
      <aside className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="welcome-message">
          Welcome to AlphaETF! Discover and compare ETFs with ease for smart, informed investing. Start your journey to simpler and effective investment choices now!
        </div>
        <Dropdown label="Asset Class" options={assetClassOptions} onSelect={setAssetClass} className="dropdown-first"/>
        <Dropdown label="Investment Focus" options={investmentFocusOptions} onSelect={setInvestmentFocus} />
        <Dropdown label="ETFs" options={etfsOptions} onSelect={setEtfs} />
      </aside>
      <main className="content">
        <header className="content-header">
          AlphaETF
        </header>
        <MessageDisplay messages={messages} />
        <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
        <ChatInput onSendMessage={onSendMessage} />
      </main>
    </div>
  );
};

export default App;