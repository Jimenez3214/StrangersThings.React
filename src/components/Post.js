import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api";
import Message from "./Message";

const PostList = () => {
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
        console.log(data);
        setPost(data.data.posts);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetch", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div id="PostList">
      <h1 className='display-4 font-weight-bold text-danger' style={{ fontFamily: 'Benguiat Bold' }}>New Listings</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : posts && posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="card mb-3" key={post._id}>
              <div className="card-body">
                <h2 className="card-title">Title: {post.title}</h2>
                <p className="card-text">User: {post.author.username}</p>
                <p className="card-text">Description: {post.description}</p>
                <p className="card-text">Price: {post.price}</p>
                <p className="card-text">Location: {post.location}</p>
                <p className="card-text">
                  Will Deliver: {post.willDeliver ? "Yes" : "No"}
                </p>
                <Message postId={post._id} authorId={post.author._id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    {/*   {selectedPostId && (
        <form onSubmit={handleSubmitMessage} className="mt-4">
          <h2 className="mb-3">Compose Message</h2>
          <div className="form-group">
            <label htmlFor="recipient">Recipient:</label>
            <input
              type="text"
              id="recipient"
              className="form-control"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="messageContent">Message:</label>
            <textarea
              id="messageContent"
              className="form-control"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      )} */}
    </div>
  );
};

export default PostList;
