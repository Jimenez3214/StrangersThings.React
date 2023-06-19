import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../api";
import { AuthContext } from "../app";
import jwtDecode from "jwt-decode";
import EditListing from "./EditListing"; // Update the import statement for EditListing

const MyListings = () => {
  const { token } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListings();
  }, [token]);

  const fetchListings = async () => {
    try {
      const decodeToken = jwtDecode(token);
      const userId = decodeToken.userId;
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const activeListings = data.data.posts.filter(
          (listing) => listing.active
        );
        setListings(activeListings);
        //setListings(data.data.posts ?? []);
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching the listings:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const deleteListing = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
      console.error("An error occurred while deleting the listing:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const editListing = async (postId, payload) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: payload }),
      });
      const data = await response.json();
      if (response.ok) {
        const editedListing = data.data.post;
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === postId ? { ...listing, ...editedListing } : listing
          )
        );
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      console.error("An error occurred while editing the listing:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleEdit = async (postId, payload) => {
    try {
      await editListing(postId, payload);
    } catch (error) {
      console.error("An error occurred while handling the edit:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deleteListing(postId);
    } catch (error) {
      console.error("An error occurred while handling the delete:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>My Listings</h1>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <p>Title: {listing.title}</p>
              <p>Description: {listing.description}</p>
              <p>Price: {listing.price}</p>
              <p>Location: {listing.location}</p>
              <button onClick={() => handleDelete(listing._id)}>Delete</button>
              <EditListing
                token={token}
                postId={listing._id}
                handleEdit={handleEdit}
              />
            </li>
          ))}
        </ul>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MyListings;
