import { useDispatch, useSelector } from 'react-redux';
import './NewsFeed.css';
import { useState } from 'react';
import CreatePostButton from '../CreatePost/CreatePostButton';
import CreatePostModal from '../CreatePost/CreatePostModal';
import PostItemIndex from '../PostItemIndex/PostItemIndex';

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
    );
}

export default NewsFeed;
