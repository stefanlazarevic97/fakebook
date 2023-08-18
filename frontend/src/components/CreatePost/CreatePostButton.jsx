import { BsPersonCircle } from 'react-icons/bs'; 
import './CreatePostButton.css';

const CreatePostButton = ({ openModal, currentUser }) => {
    return (
        <div className="create-post-container" onClick={openModal}>
            {currentUser.profilePictureUrl ? 
                <img className="create-post-logo" src={currentUser.profilePictureUrl} alt="User Profile" /> : 
                <BsPersonCircle className="create-post-logo" />
            }
            <div className="create-post-button">
                {`What's on your mind, ${currentUser.firstName}?`}
            </div>
        </div>
    );
}


export default CreatePostButton;
