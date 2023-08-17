import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { createPost } from "../../store/postsReducer";
import { useDispatch, useSelector } from "react-redux";

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
                <CgProfile className="profile-button-logo" />

                <ul>
                    {postErrors.map(error => <li key={error}>{error}</li>)}
                </ul>

                <h2>Create post</h2>
                <button onClick={closeModal}>X</button>
            </div>

            <div className="modal-body">
                <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    placeholder={`What's on your mind, ${currentUser.firstName}?`}
                />

                <button onClick={handleSubmit}>Post</button>
            </div>
        </div>
    );
}

export default CreatePostModal;
