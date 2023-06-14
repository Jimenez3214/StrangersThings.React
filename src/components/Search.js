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

      const filteredResults = data.data.posts.filter((result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      result.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

      setSearchResults(filteredResults)

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
          id='keywords'
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
        <div key={result._id}>
        <p>{result.author.username}</p>
        <p>{result.title} </p>
        <p> {result.description} </p>
        <p> {result.price} </p>
        <p> {result.willDeliver}</p>
        </div>
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
