import './NewsFeed.css';
import * as sessionActions from "../../store/session";
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const NewsFeed = () => {
    const dispatch = useDispatch();
    
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        return <Redirect to="/login" />
    };

    return (
        <>
            <button onClick={logout}>Log Out</button>
            <h1>News Feed</h1>
        </>
    )
}

export default NewsFeed;