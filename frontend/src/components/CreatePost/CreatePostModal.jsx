import { useState } from "react";

const CreatePostModal = ({ closeModal, currentUser, createPost }) => {
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost ({ body });
        closeModal();
    }

    return (
        <div className="create-post-modal">
            <div className="modal-header">
                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="profile button logo" className="profile-button-logo" />
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
