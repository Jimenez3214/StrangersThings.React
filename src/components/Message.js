import React, { useState, useRef, useContext, useEffect } from "react";
import { BASE_URL } from "../api";
import { AuthContext } from "../app";

const Message = ({ postId, authorId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messageRef = useRef("");
  const { token, isLoggedIn } = useContext(AuthContext);

  const postMessage = async () => {
    if (!isLoggedIn) {
      console.log("User not logged in. Unable to post message.");
      return;
    }
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
        // Message posted successfully
        const newMessage = data.data.message; // Get the newly posted message
        console.log("New Message:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        messageRef.current.value = ""; // Clear the message input field
      } else {
        console.log(
          "Error occurred while posting a message:",
          data && data.error
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred while posting a message:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`);
      const data = await response.json();
      if (Array.isArray(data)) {
        // Fetch user information for each message
        const messagesWithUsernames = await Promise.all(
          data.map(async (message) => {
            const userResponse = await fetch(
              `${BASE_URL}/users/${message.fromUser}`
            );
            const userData = await userResponse.json();
            const username = userData.username;
            return { ...message, fromUser: username };
          })
        );
        setMessages(messagesWithUsernames);
      } else {
        console.log("Received data is not an array:", data);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
                  <p>Content: {message.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <form>
        <input type="text" placeholder="Message" ref={messageRef} />
        <button type="button" onClick={postMessage} disabled={!isLoggedIn}>
          Post Message
        </button>
      </form>
    </div>
  );
};

export default Message;
