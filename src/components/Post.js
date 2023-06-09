import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../api';


const Post = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async() => {
            try {
                const response = await fetch(`${BASE_URL}/posts/${postId}`);
                const data = await response.json();
                //console.log(data)
                setPost(data.post);
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
            ) : post ? (
                <div>
                    <p>Title: {post.title}</p>
                    <p>Description: {post.description}</p>
                    <p>Price: {post.price}</p>
                    <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
                    <button>Edit Post</button>
                    <button>Delete Post</button>
                </div>
            ) : (
                <p>Post not found</p>
            )}
        </div>
    );
};

export default Post;