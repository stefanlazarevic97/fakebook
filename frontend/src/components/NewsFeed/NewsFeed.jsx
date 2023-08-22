import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CreatePostButton from '../CreatePost/CreatePostButton';
import CreatePostModal from '../CreatePost/CreatePostModal';
import PostItemIndex from '../PostItemIndex/PostItemIndex';
import './NewsFeed.css';
import FriendIndex from '../FriendsIndex/FriendIndex';

const NewsFeed = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    if (!sessionUser) return null;

    const createPost = (post) => {
        dispatch(createPost(post));
    }

    return (
        <div className="news-feed-container">
            <div className="left-sidebar">
                <h1>Left Sidebar</h1>
            </div>
            <div className="main-feed">
                <CreatePostButton openModal={openModal} currentUser={sessionUser} />
                {modalOpen &&
                    <CreatePostModal
                        closeModal={closeModal}
                        currentUser={sessionUser}
                        createPost={createPost}
                    />
                }
                <PostItemIndex user={sessionUser}/>
            </div>
            <div className="right-sidebar">
                <FriendIndex user={sessionUser} />
            </div>
        </div>
    );
}

export default NewsFeed;
