import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, getSearchResults } from "../../store/usersReducer";
import { useEffect, useMemo, useState } from "react";
import SearchResults from "./SearchResults";

const UserSearch = props => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const searchResults = useSelector(getSearchResults);

    useEffect(() => {
        setShowDropdown(searchResults.length > 0);
    }, [searchResults]);

    const handleSearch = (e) => {
        e.preventDefault();
    }

    const defineDebounceBehavior = () => {
        let timeout;

        return function fn(params) {
            if (timeout) { clearTimeout(timeout) }

            timeout = setTimeout(() => {
                dispatch(fetchUsers(params));
            }, 500)

            return fn;
        }
    }

    const debouncedSearch = useMemo(() => defineDebounceBehavior(), []);

    const handleInputChange = field => async e => {
        const newParams = { ...searchParams, [field]: e.target.value };
        debouncedSearch(newParams);
        setSearchParams(prev => ({ ...prev, [field]: e.target.value}));
    }

    return (
        <div className="user-search">
            <form 
                className="user-search-form" 
                onSubmit={handleSearch}>
                <input 
                    placeholder="Search Fakebook"
                    value={searchParams.search || ''}
                    onChange={handleInputChange('search')}
                />
            </form>

            {showDropdown && <SearchResults />}
        </div>
    )
}

export default UserSearch;