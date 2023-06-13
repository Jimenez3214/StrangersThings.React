import React, { useState } from 'react';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch();
            const data = await response.json();

            setSearchResults(data);
        } catch (error) {
            console.log('Error during the search', error);
        }
        setIsLoading(false);
    };

    return (
        <div id='Search'>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target)}                
                placeholder='search query'
                required
                />
                <button type='submit'>Search</button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {searchResults.length > 0 ?(
                        <ul>
                            {searchResults.map((results) => (
                                  <li key={result.id}>{result.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No results found</p>
                    )}    
                </div>
            )}
        </div>
      
    );
};

export default Search;