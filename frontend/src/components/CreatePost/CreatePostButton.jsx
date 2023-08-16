const CreatePostButton = ({ openModal, currentUser }) => {
    return (
        <button onClick={openModal} className="create-post-button">
            <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="profile button logo" className="profile-button-logo" />
            {`What's on your mind, ${currentUser.firstName}?`}
        </button>
    );
}

export default CreatePostButton;
