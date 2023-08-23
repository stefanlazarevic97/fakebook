import { useSelector } from "react-redux"
import { getSearchResults } from "../../store/usersReducer"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BsPersonCircle } from 'react-icons/bs';

const SearchResults = () => {
    const searchResults = useSelector(getSearchResults);

    return (
        <div className="search-results">
            {searchResults.length > 0 ? (
                searchResults.map(user => (
                    <Link key={user.id} to={`/users/${user.id}`} className="user-link">
                        <div className="user-item">
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
                    </Link>
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    )
}

export default SearchResults;