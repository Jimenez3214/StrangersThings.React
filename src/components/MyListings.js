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
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('API Response:', data); // Log the API response for debugging
        if (response.ok) {
          setListings(data?.posts ?? []); // Use optional chaining and nullish coalescing operator
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

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log('Listings:', listings); // Log the listings array for debugging

  return (
  
    <div>
      <h1>My Listings</h1>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <div key={listing._id}>
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            {/* Render other listing details */}
          </div>
        ))
      ) : (
        <p>No listings found.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default MyListings;
