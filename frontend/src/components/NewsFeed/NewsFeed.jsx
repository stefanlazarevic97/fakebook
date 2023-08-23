import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CreatePostButton from '../CreatePost/CreatePostButton';
import CreatePostModal from '../CreatePost/CreatePostModal';
import PostItemIndex from '../PostItemIndex/PostItemIndex';
import './NewsFeed.css';
import FriendIndex from '../FriendsIndex/FriendIndex';
import { getFriendsByUserId } from '../../store/friendshipsReducer';
import { getPostsByUserId } from '../../store/postsReducer';

const NewsFeed = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    const createPost = (post) => {
        dispatch(createPost(post));
    }
    
    if (!sessionUser) return null;

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
                <PostItemIndex />
            </div>
            <div className="right-sidebar">
                <FriendIndex user={sessionUser} />
            </div>
        </div>
    );
}

export default NewsFeed;
