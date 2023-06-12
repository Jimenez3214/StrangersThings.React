import React, { useState } from 'react';

const Search = () => {
    const [searchQuery, setSearchQuery] = userState('');
    const [searchResults, setSearchResults] = userState([]);
    const [isLoading, setIsLoading] = userState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const response = await fetch();
        }
    };

    return (
        <div id='Search'>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input/>

            </form>
        </div>
      
    );
};

export default Search;