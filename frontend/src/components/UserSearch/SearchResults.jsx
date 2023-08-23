import { useDispatch, useSelector } from "react-redux"
import { clearSearchResults, getSearchResults } from "../../store/usersReducer"
import { BsPersonCircle } from 'react-icons/bs';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
                                    className="profile-picture" 
                                    src={user.profilePictureUrl} 
                                    alt="profile" 
                                /> : 
                                <BsPersonCircle className="profile-picture" />
                            }
                            <span>{user.firstName} {user.lastName}</span>
                            <span>{user.mutualFriendsCount} mutual friends</span>
                        </div>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    )
}

export default SearchResults;