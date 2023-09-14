import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, getSearchResults } from "../../store/usersReducer";
import { useEffect, useMemo, useState, useRef } from "react";
import SearchResults from "./SearchResults";
import './UserSearch.css';

const UserSearch = props => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const searchResults = useSelector(getSearchResults);
    const containerRef = useRef();
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        const handleClickOutside = e => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
                setSearchPerformed(false); // Add this line
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

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
        setSearchPerformed(true);
    }

    return (
        <div className="user-search" ref={containerRef}>
            <form 
                className="user-search-form" 
                onSubmit={handleSearch}>
                <input 
                    className="search-input"
                    placeholder="Search Fakebook"
                    value={searchParams.search || ''}
                    onChange={handleInputChange('search')}
                />
            </form>

            {(showDropdown || searchPerformed) && <SearchResults
                setShowDropdown={setShowDropdown}
                setSearchParams={setSearchParams}
                setSearchPerformed={setSearchPerformed}
            />}
        </div>
    )
}

export default UserSearch;