import React, { useEffect, useState } from 'react';
//import { fetchQueryResultsFromURL } from "../index.js";

const COHORT_NAME = '2303-ftb-et-web-pt'

const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

//const returned = await fetch(`${BASE_URL}/posts`)

const Post = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async() => {
            try {
                const response = await fetch(`${BASE_URL}/posts`);
                const data = await response.json();
                console.log(data);

                //setPost(data);
                //setIsLoading(false);
            } catch (error) {
                console.log('Error fetch', error);
            }
        };
        fetch();
    }, [postId]);

    return (
        <div id='Post'>
            <h1>Post Details</h1>
        </div>
      
    );
};

export default Post;