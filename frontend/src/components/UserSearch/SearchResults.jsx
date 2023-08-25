import { useDispatch, useSelector } from "react-redux"
import { clearSearchResults, getSearchResults } from "../../store/usersReducer"
import { BsPersonCircle } from 'react-icons/bs';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './SearchResults.css';

const SearchResults = ({ setShowDropdown, setSearchParams }) => {
    const searchResults = useSelector(getSearchResults);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (userId) => e => {
        e.preventDefault();
        dispatch(clearSearchResults());
        setShowDropdown(false);
        setSearchParams({});
        history.push(`/users/${userId}`);
    }

    return (
        <div className="search-results">
            {searchResults.length > 0 ? (
                searchResults.map(user => (
                        <div 
                            key={user.id}
                            className="user-item"
                            onClick={handleClick(user.id)}
                        >
                            {user.profilePictureUrl ? 
                                <img 
                                    className="search-profile-picture" 
                                    src={user.profilePictureUrl} 
                                    alt="profile" 
                                /> : 
                                <BsPersonCircle className="search-profile-picture" />
                            }
                            <div className="friend-index-body">
                                <p className="friend-name">{user.firstName} {user.lastName}</p>
                                <p className="mutual-friends-count">{user.mutualFriendsCount} mutual friends</p>
                            </div>
                        </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    )
}

export default SearchResults;