import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../api';
import { AuthContext } from '../AuthContext';
import jwtDecode from 'jwt-decode';

const MyListings = () => {
  const { token } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    description: '',
    price: '',
    location: '',
  });  
  useEffect(() => {
    console.log(token);
    const fetchListings = async () => {
      try {
        const decodeToken = jwtDecode(token);
        const userId = decodeToken.userId;
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('API Response:', data); // Log the API response for debugging
        if (response.ok) {
          setListings(data.data.posts ?? []); // Use optional chaining and nullish coalescing operator
        } else {
          setError(data.error.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching the listings:', error);
        setError('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [token]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Delete Response:', data);

      if (response.ok) {
        // Remove the deleted listing from the state
        setListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== postId)
        );
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting the listing:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleEdit = async (postId, field, value) => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2303-ftb-et-web-pt/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          [field]: value,
        }),
      });
      const data = await response.json();
      console.log('Edit Response:', data);
      // Handle success or display error message
    } catch (error) {
      console.log('Edit Error:', error);
      // Handle error
    }
  };
  
  

  console.log('Listings:', listings); // Log the listings array for debugging
  return (
    <div>
      <h1>My Listings</h1>
      {listings.length > 0 ? (
        listings
          .filter((listing) => listing.active) // Filter out inactive listings
          .map((listing) => (
            <div key={listing._id}>
              <h2>{listing.title}</h2>
              <p>
                Description:
                <input
                  type="text"
                  value={listing.description}
                  onChange={(e) =>
                    handleEdit(listing._id, 'description', e.target.value)
                  }
                />
              </p>
              <p>
                Price:
                <input
                  type="text"
                  value={listing.price}
                  onChange={(e) =>
                    handleEdit(listing._id, 'price', e.target.value)
                  }
                />
              </p>
              <p>
                Location:
                <input
                  type="text"
                  value={listing.location}
                  onChange={(e) =>
                    handleEdit(listing._id, 'location', e.target.value)
                  }
                />
              </p>
              <p>
                Will Deliver: {listing.willDeliver ? 'Yes' : 'No'}
              </p>
              {/* Render other listing details */}
              <button onClick={() => handleDelete(listing._id)}>
                Delete
              </button>
              <button onClick={() => handleSave(listing._id)}>Save</button>
            </div>
          ))
      ) : (
        <p>No active listings found.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
  
};

export default MyListings
