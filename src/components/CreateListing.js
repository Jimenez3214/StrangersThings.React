import React, { useContext, useState } from "react";
import { BASE_URL } from "../api";
import { AuthContext } from "../app";

const CreateListing = () => {
  const { token } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            username,
            description,
            price,
            location: location || "[On Request]",
            willDeliver,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Post created successfully
        console.log("Post created:", result, token);
        // Clear form inputs
        setUsername("");
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setWillDeliver(false);
        setError(null);
      } else {
        setError(result.error.message);
      }
    } catch (error) {
      console.error("An error occurred while creating the post:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handlePriceChange = (e) => {
    const inputPrice = e.target.value;
    const numericPrice = parseFloat(inputPrice);

    // Check if the input is a valid number
    if (!isNaN(numericPrice)) {
      setPrice(numericPrice.toString());
    } else {
      setPrice("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div>
      <h1 className='display-4 font-weight-bold text-danger' style={{ fontFamily: 'Benguiat Bold' }}>Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="text"
            id="price"
            className="form-control"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="willDeliver"
            className="form-check-input"
            checked={willDeliver}
            onChange={(e) => setWillDeliver(e.target.checked)}
          />
          <label htmlFor="willDeliver" className="form-check-label">
            Will Deliver
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateListing;
