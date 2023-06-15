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
    fetchListings();
  }, [token]);

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
      if (response.ok) {
        setListings(data.data.posts ?? []);
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

  const deleteListing = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
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

  const editListing = async (postId, payload) => {
    console.log('Edit Post ID:', postId);
    console.log('Edit Payload:', payload);
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      console.log('editListing response:', response);
      console.log('editListing data:', data);
      if (response.ok) {
        const editedListing = data.data.post;
        console.log('Edited Listing:', editedListing);
        // Update the listings state with the edited data
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === postId ? { ...listing, ...editedListing } : listing
          )
        );
      } else {
        console.log('Edit Error:', data.error);
        // Handle the error and provide appropriate feedback to the user
      }
    } catch (error) {
      console.error('Edit Error:', error);
      // Handle error
    }
  };

  const handleDelete = async (postId) => {
    await deleteListing(postId);
  };

  const handleEdit = async (postId, field, value) => {
    console.log('Edit:', postId, field, value);
    try {
      const payload = {
        [field]: value,
      };
  
      console.log('Edit Payload:', payload); // Log the payload being sent
  
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      console.log('Edit Response:', response); // Log the API response
      console.log('Edit Data:', data); // Log the parsed API response data
  
      if (response.ok) {
        console.log('Edit Successful:', data);
        // Update the listings state with the edited data
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === postId ? { ...listing, [field]: value } : listing
          )
        );
      } else {
        console.log('Edit Error:', data.error);
        // Handle the error and provide appropriate feedback to the user
      }
    } catch (error) {
      console.error('Edit Error:', error);
      // Handle error
    }
  };
  

  const handleSave = async (postId) => {
    console.log('postId:', postId);
    const listing = listings.find((listing) => listing._id === postId);
    if (listing) {
      console.log('Before save:', editedData); // Log the editedData before saving
      console.log('Listing:', listing); // Log the corresponding listing
      handleEdit(postId, 'description', editedData.description);
      handleEdit(postId, 'price', editedData.price);
      handleEdit(postId, 'location', editedData.location);
      const payload = {
        description: editedData.description || listing.description,
        price: editedData.price || listing.price,
        location: editedData.location || listing.location,
      };
  
      await editListing(postId, payload);
      setEditedData({
        description: '',
        price: '',
        location: '',
      });
    }
  };
  

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <h1>My Listings</h1>
      {/* ... */}
      {listings.length > 0 ? (
        listings
          .filter((listing) => listing.active)
          .map((listing) => (
            <div key={listing._id}>
              <h2>{listing.title}</h2>
              <p>
                Description:
                <input
                  type="text"
                  value={editedData.description || listing.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                />
              </p>
              <p>
                Price:
                <input
                  type="text"
                  value={editedData.price || listing.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </p>
              <p>
                Location:
                <input
                  type="text"
                  value={editedData.location || listing.location}
                  onChange={(e) =>
                    handleInputChange('location', e.target.value)
                  }
                />
              </p>
              <p>Will Deliver: {listing.willDeliver ? 'Yes' : 'No'}</p>
              {/* ... */}
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

export default MyListings;


  