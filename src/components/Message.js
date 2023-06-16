import React, { useState, useRef, useContext } from 'react';
import { BASE_URL } from '../api';
import { AuthContext } from '../app';

const Message = ({ postId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userIdRef = useRef(null);
  const messageRef = useRef('');
  const { token } = useContext(AuthContext);


/* The issue isn't in the code structure, we need to call the userID not the username. So when you send a message
it sends to the string associated with the user, NOT THE USERNAME. We need to rewrite the JSX to reflect this. Also, remove the post recipient in the JSX.
Basically, we have to completely rework this whole code. Overall, we're almost done. I have some bootstrap in the search function. I'm not a fan of CSS
I honestly don't think many people are, we can do it, but you know. This really belongs in the readme... Also, next time I do a project like this, there's 
so many things I would do different to make this so much easier. But for first try, I think we did pretty good Edd. */

  const postMessage = async () => {
    try {
      console.log('Sending message...');
      const response = await fetch(`${BASE_URL}/posts/${userId}/messages`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: messageRef.current.value
          }
        })
      });
      const data = await response.json();
      console.log('Response:', data);
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.log('Received data is not an array:', data);
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Error occurred while posting a message:', error)
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





// const handleSendMessage = async (postId, message) => {
//   try {
    
//     const response = await fetch(`${BASE_URL}/posts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         message: {
//           content: message,
//         },
//       }),
//     });

//     const data = await response.json();
//     console.log(data);

//     if (data.success) {
//       const newMessage = data.data.message;
//       setMessages([...messages, newMessage]);
//     } else {
//       console.log('Failed to send message:', data.error);
//     }
//   } catch (error) {
//     console.error('Error occurred while sending the message:', error);
//   }
// };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const userId = userIdRef.current.value;
  //   const message = messageRef.current.value;
  //   console.log('userId:', userId);
  //   console.log('message:', message);
  //   // handleSendMessage(userId, message);
  // };