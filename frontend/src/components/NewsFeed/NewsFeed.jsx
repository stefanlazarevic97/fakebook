import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import CreatePostButton from '../CreatePost/CreatePostButton';
import CreatePostModal from '../CreatePost/CreatePostModal';
import PostItemIndex from '../PostItemIndex/PostItemIndex';
import './NewsFeed.css';
import FriendIndex from '../FriendsIndex/FriendIndex';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

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
                <a href="https://github.com/stefanlazarevic97" target="_blank" rel="noreferrer" className="social-link">
                    <BsGithub className="social-media-icons" />
                </a>

                <a href="https://www.linkedin.com/in/stefan-lazarevic-a5b60413a/" target="_blank" rel="noreferrer" className="social-link">
                    <BsLinkedin className="social-media-icons" />
                </a>
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
