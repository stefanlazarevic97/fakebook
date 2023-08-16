import { CgProfile } from 'react-icons/cg'; 

const CreatePostButton = ({ openModal, currentUser }) => {
    return (
        <button onClick={openModal} className="create-post-button">
            <CgProfile className="profile-button-logo" />
            {`What's on your mind, ${currentUser.firstName}?`}
        </button>
    );
}

export default CreatePostButton;
