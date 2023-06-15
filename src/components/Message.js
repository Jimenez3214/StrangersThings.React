import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/POST_ID/messages`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.log('Received data is not an array:', data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log('Error occurred while fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = (userId, message) => {
    console.log(`Sending message to user ${userId}: ${message}`);
  };

  return (
    <div>
      <h1>Messages</h1>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        <div>
          {messages.length === 0 ? (
            <p>No messages available</p>
          ) : (
            <ul>
              {messages.map((message) => (
                <li key={message.id}>
                  <p>From: {message.sender}</p>
                  <p>To: {message.recipient}</p>
                  <p>{message.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const userId = ''; 
          const message = ''; 
          handleSendMessage(userId, message);
        }}
      >
        <input type="text" placeholder="Recipient ID" />
        <input type="text" placeholder="Message" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Message;

