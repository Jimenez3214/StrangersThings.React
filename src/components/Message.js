import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api';

const Message = () => {
    const [message, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        const fetchMessages = async () => {
            try{
                const response = await fetch (`${BASE_URL}/post/POST_ID/messages`)
                const data = await response.json();

                setMessages(data);
                setIsLoading(false);
            }catch(error){
                console.log('Error is a fetching!', error);

            }
        }
        fetchMessages();
    })

    const handleSendMessage = (userId, message) => {
        console.log(`sending message to user ${userId}: ${message}`)
    };

    return (
        <div>
        <h1>Messages</h1>
        {isLoading ?(
            <p>Loading messages...</p>
        ) : (
            <div>
            {message.length === 0 ? (
                <p>No messages available</p>
            ) : (
                <ul>
                    {message.map((message) => (
                        <li key={message.id}>
                            <p>From: {message.sender} </p>
                            <p>To: {message.recipient}</p>
                            <p>{message.content}</p>
                        </li>
                    ))}
                </ul>
            )}
            </div>
        )}
    </div>
    {/* form for sending message */}
    <form
        onSubmit={(e) => {
            e.preventDefult();
            const userId = ''; // Provide userid
            const message = ''; // Get message
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