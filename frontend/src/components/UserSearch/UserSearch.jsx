import { useDispatch } from "react-redux"
import { fetchUsers } from "../../store/usersReducer";
import { useMemo, useState } from "react";

const UserSearch = props => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useState({});

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
        </div>
    )
}

export default UserSearch;