import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/usersReducer';

const EditProfileForm = ({ user, onClose }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [phone, setPhone] = useState(user.phone);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            id: user.id,
            firstName,
            lastName,
            bio,
            phone,
            email,
        };

        dispatch(updateUser(updatedUser));

        if (onClose) onClose();
    };

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button 
                className="edit-profile-submit-button"
            >
                Update Profile
            </button>
        </form>
    );
};

export default EditProfileForm;
