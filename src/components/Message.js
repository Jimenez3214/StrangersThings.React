import React, { useState, useRef, useContext } from "react";
import { BASE_URL } from "../api";
import { AuthContext } from "../app";

const Message = ({ postId, authorId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userIdRef = useRef(null);
  const messageRef = useRef("");
  const { token } = useContext(AuthContext);

  const postMessage = async () => {
    try {
      console.log("Sending message...");
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: messageRef.current.value,
            fromUser: authorId, 
          },
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.log("Received data is not an array:", data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred while posting a message:", error);
    }
  };

  return (
    <div>
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

      <form>
        <input type="text" placeholder="Recipient ID" ref={userIdRef} />
        <input type="text" placeholder="Message" ref={messageRef} />
        <button type="button" onClick={postMessage}>
          Post Message
        </button>
      </form>
    </div>
  );
};

export default Message;
