import React, { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../api";
import { AuthContext } from "../app";


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(AuthContext);
  console.log('Profile Token:', token);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Response:", response);
        console.log("Data:", data);
        setUserData(data); 
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [token]);
  

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h2>Welcome, {userData.username}!</h2>
      <h3>Your Posts:</h3>
      {userData.posts && userData.posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {userData.posts &&
            userData.posts.map((post) => (
              <li key={post._id}>
                <h4>{post.title}</h4>
                <p>Location: {post.location}</p>
                <p>Description: {post.description}</p>
                <p>Price: {post.price}</p>
                </li>
            ))}
        </ul>
      )}
      <h3>Your Messages:</h3>
      {userData.messages && userData.messages.length === 0 ? (
        <p>No messages available</p>
      ) : (
        <ul>
          {userData.messages &&
            userData.messages.map((message) => (
              <li key={message._id}>
                <h4>From: {message.fromUser.username}</h4>
                <p>Content: {message.content}</p>
                
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;

