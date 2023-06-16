import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api';
import Message from './Message';

const PostList = () => {
    const [posts, setPost] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPostId, setSelectedPostId] = useState(null);
   

    useEffect(() => {
        const fetchPosts = async() => {
            try {
                const response = await fetch(`${BASE_URL}/posts`);
                const data = await response.json();
                console.log(data)
                setPost(data.data.posts);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetch', error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div id="PostList">
        <h1>Post List</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : posts && posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post._id}>
                <h2>Title: {post.title}</h2>
                <p>User: {post.author.username}</p>
                <p>Description: {post.description}</p>
                <p>Price: {post.price}</p>
                <p>Location: {post.location}</p>
                <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
                <Message postId={post.author.username}/>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
        {selectedPostId && (
        <form onSubmit={handleSubmitMessage}>
          <h2>Compose Message</h2>
          <label>
            Recipient:
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <label>
            Message:
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </label>
          <button type="submit">Send</button>
        </form>
      )}
      </div>
    );
};
export default PostList;