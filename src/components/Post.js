import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api';

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenStringGoesHereDude}`, 
          },
        });

        const data = await response.json();
        console.log(data);
        setPost(data.data.posts);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetch', error);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div id='Post'>
      <h1>Post Details</h1>
      {isLoading ? (
        <p>Loading post...</p>
      ) : post && Array.isArray(post) && post.length > 0 ? (
        post.map((postItem) => (
          <div key={postItem._id}>
            <p>Title: {postItem.title}</p>
            <p>Description: {postItem.description}</p>
            <p>Price: {postItem.price}</p>
            <p>Will Deliver: {postItem.willDeliver ? 'Yes' : 'No'}</p>
            {postItem.isAuthor && postItem.messages.length > 0 ? (
              <div>
                <h2>Messages</h2>
                {postItem.messages.map((message) => (
                  <div key={message._id}>
                    <p>From User: {message.fromUser.username}</p>
                    <p>Content: {message.content}</p>
                  </div>
                ))}
              </div>
            ) : null}
            <button>Edit Post</button>
            <button>Delete Post</button>
          </div>
        ))
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default Post;
