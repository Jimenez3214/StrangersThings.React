import React, { useContext, useState } from 'react';
import { BASE_URL } from '../api';
import { AuthContext } from '../app';
//import { AuthContext } from '../app';


const CreateListing = () => {
  const { token } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            username,
            description,
            price,
            location: location || '[On Request]',
            willDeliver,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Post created successfully
        console.log('Post created:', result, token);
        // Clear form inputs
        setUsername('');
        setTitle('');
        setDescription('');
        setPrice('');
        setLocation('');
        setWillDeliver(false);
        setError(null);
      } else {
        setError(result.error.message);
      }
    } catch (error) {
      console.error('An error occurred while creating the post:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div>
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Will Deliver:
          <input type="checkbox" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateListing;


