import React, { useState, useRef, useContext, useEffect } from "react";
import { BASE_URL } from "../api";
import { AuthContext } from "../app";

const Message = ({ postId, authorId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messageRef = useRef("");
  const { token, username } = useContext(AuthContext);


  useEffect(() => {
    // Load messages from local storage when the component mounts
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save messages to local storage whenever they change
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

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
      if (data && data.success) {
        const newMessage = data.data.message; 
        setMessages((prevMessages) => [...prevMessages, newMessage]); 
        messageRef.current.value = "";
      } else {
        console.log("Error occurred while posting a message:", data && data.error);
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
                  <p>From:  {message.fromUser}</p>
                  <p>Message: {message.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <form>
        <input type="text" className="input-group" placeholder="Message" ref={messageRef} />
        <button type="button" className="btn btn-primary" onClick={postMessage}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Message;
