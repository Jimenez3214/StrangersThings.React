import React, { useContext, useEffect, useState } from 'react';
import { BASE_URL } from '../api';
import { AuthContext } from '../AuthContext';
import jwtDecode from 'jwt-decode';

const MyListings = () => {
  const { token } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (POST_ID) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${POST_ID}`, {
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
          prevListings.filter((listing) => listing._id !== POST_ID)
        );
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting the listing:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleEdit = (POST_ID) => {
    // Handle the editing of the listing based on the postId
    console.log(`Editing listing with ID: ${POST_ID}`);
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
              <p>{listing.description}</p>
              {/* Render other listing details */}
              <button onClick={() => handleDelete(listing._id)}>Delete</button>
              <button onClick={() => handleEdit(listing._id)}>Edit</button>
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
