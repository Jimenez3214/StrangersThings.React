import React, { useState } from "react";
import { BASE_URL } from "../api";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      console.log(data);

      const filteredResults = data.data.posts.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.author.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.log("Error during the search", error);
    }
    setIsLoading(false);
  };

  return (
    <div id="Search" className="container">
      <h1 className="mt-5">Search</h1>
      <form className="mt-4 mb-4" onSubmit={handleSearch}>
        <div className="input-group">
          <input
            id="keywords"
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search query"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : searchResults && searchResults.length > 0 ? (
        <div>
          <ul className="list-group">
            {searchResults.map((result) => (
              <li key={result._id} className="list-group-item">
                <p className="mb-0">
                  <strong>Username:</strong> {result.author.username}
                </p>
                <p className="mb-0">
                  <strong>Title:</strong> {result.title}
                </p>
                <p className="mb-0">
                  <strong>Description:</strong> {result.description}
                </p>
                <p className="mb-0">
                  <strong>Price:</strong> {result.price}
                </p>
                <p className="mb-0">
                  <strong>Will Deliver:</strong>{" "}
                  {result.willDeliver ? "Yes" : "No"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
