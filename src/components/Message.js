import React, { useEffect, useState, useRef, useContext } from 'react';
import { BASE_URL } from '../api';
import { AuthContext } from '../AuthContext';

const Message = ({ postId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userIdRef = useRef(null);
  const messageRef = useRef(null);
  const { token } = useContext(AuthContext);

  console.log('postId:', postId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from the AuthContext
          },
        });
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
  }, [postId, token]);

  const handleSendMessage = async (userId, message) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the token from the AuthContext
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });

      const data = await response.json();
      console.log(data);

      // Handle the response data as needed
      if (data.success) {
        const newMessage = data.data.message;
        setMessages([...messages, newMessage]);
      } else {
        console.log('Failed to send message:', data.error);
      }
    } catch (error) {
      console.error('Error occurred while sending the message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = userIdRef.current.value;
    const message = messageRef.current.value;
    console.log('userId:', userId);
    console.log('message:', message);
    handleSendMessage(userId, message);
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
                <li key={message._id}>
                  <p>From: {message.fromUser}</p>
                  <p>To: {message.post}</p>
                  <p>{message.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Recipient ID" ref={userIdRef} />
        <input type="text" placeholder="Message" ref={messageRef} />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Message;



