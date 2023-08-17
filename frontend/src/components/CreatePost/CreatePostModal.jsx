import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/postsReducer';
import { BsPersonCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import './CreatePostModal.css';

const CreatePostModal = ({ closeModal, currentUser }) => {
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const postErrors = useSelector(state => state.errors.posts);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ authorId: currentUser.id, body }));
        closeModal();
    }

    return (
        <div className="create-post-modal">
            <div className="modal-header">
                <h2>Create Post</h2>
                <div className="close-button" onClick={closeModal}>
                    <IoClose className="close-button-x" />
                </div>
            </div>
            <hr />
            <div className="modal-body">
                <div className="user-info">
                    {currentUser.photoUrl ? 
                        <img className="create-post-logo" src={currentUser.photoUrl} alt="User Profile" /> : 
                        <BsPersonCircle className="create-post-logo" />
                    }
                    {currentUser.firstName} {currentUser.lastName}
                </div>
                <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder={`What's on your mind, ${currentUser.firstName}?`}
                />
            </div>

            <div className="modal-footer">
                <button onClick={handleSubmit}>Post</button>
            </div>

            <ul className="error-list">
                {postErrors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
    );
}

export default CreatePostModal;