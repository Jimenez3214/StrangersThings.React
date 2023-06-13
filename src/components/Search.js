import React, { useState } from 'react';
import { BASE_URL } from '../api';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      console.log(data); 
      setSearchResults(data.data.posts); 
    } catch (error) {
      console.log('Error during the search', error);
    }
    setIsLoading(false);
  };
  

  return (
    <div id="Search">
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search query"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? (
  <p>Loading...</p>
) : searchResults && searchResults.length > 0 ? (
  <div>
    <ul>
      {searchResults.map((result) => (
        <li key={result._id}>{result.title}</li>
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
