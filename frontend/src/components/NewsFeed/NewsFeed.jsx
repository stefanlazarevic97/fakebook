import { useSelector } from 'react-redux';
import './NewsFeed.css';

const NewsFeed = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return null;
    
    return (
        <>
            <h1>News Feed</h1>
        </>
    )
}

export default NewsFeed;