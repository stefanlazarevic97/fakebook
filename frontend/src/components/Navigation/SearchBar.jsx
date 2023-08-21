import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../store/searchReducer';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const searchResults = useSelector(state => state.search.results);
    const isLoading = useSelector(state => state.search.loading);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchUsers(query));
    }

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            <div className="search-results">
                {isLoading && <p>Loading...</p>}
                
                <ul>
                    {searchResults.map(user => (
                        <li key={user.id}>
                            <img src={user.profilePictureUrl} alt="Profile" />
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{user.mutualFriendsCount} mutual friends</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;
