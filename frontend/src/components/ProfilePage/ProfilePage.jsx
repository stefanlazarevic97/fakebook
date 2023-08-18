import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser, getUser } from "../../store/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsPersonCircle } from 'react-icons/bs';
import { GiPhotoCamera } from 'react-icons/gi';
import PostItemIndex from "../PostItemIndex/PostItemIndex";
import './ProfilePage.css';

const ProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const dispatch = useDispatch();
    const [profilePictureDropdown, setProfilePictureDropdown] = useState(false);
    const [coverPhotoDropdown, setCoverPhotoDropdown] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);
    
    const toggleProfilePictureDropdown = () => {
        setProfilePictureDropdown(prev => !prev);
    }

    const toggleCoverPhotoDropdown = () => {
        setCoverPhotoDropdown(prev => !prev);
    }

    const handleChangeProfilePicture = () => {
        // some logic
        setProfilePictureDropdown(false);
    }

    const handleDeleteProfilePicture = () => {
        // some logic
        setProfilePictureDropdown(false);
    }

    const handleChangeCoverPhoto = () => {
        // some logic
        setCoverPhotoDropdown(false);
    }

    const handleDeleteCoverPhoto = () => {
        // some logic
        setCoverPhotoDropdown(false);
    }

    return (
        <div className="profile-page">
            <div 
                className="cover-photo-container" 
                onClick={toggleCoverPhotoDropdown}>
                
                {user?.coverPhotoUrl ?
                    <img 
                        className="cover-photo" 
                        src={user?.coverPhotoUrl} 
                        alt="cover" 
                    /> : 
                    <GiPhotoCamera className="cover-photo" />
                }
                {coverPhotoDropdown && (
                    <div className="cover-photo-dropdown-menu">
                        <button 
                            onClick={handleChangeCoverPhoto}>
                                Change Cover Photo
                        </button>
                        <button 
                            onClick={handleDeleteCoverPhoto}>
                                Delete Cover Photo
                        </button>
                    </div>
                )}
            </div>
            
            <h1 className="user-name">{user?.firstName} {user?.lastName}</h1>

            <div 
                className="profile-picture-container" 
                onClick={toggleProfilePictureDropdown}>

                {user?.photoUrl ? 
                    <img 
                    className="profile-picture" 
                    src={user?.photoUrl} 
                    alt="profile" 
                    /> : 
                    <BsPersonCircle className="profile-picture" />
                }
                {profilePictureDropdown && (
                    <div className="profile-dropdown-menu">
                        <button 
                            onClick={handleChangeProfilePicture}>
                                Change Profile Picture
                        </button>
                        <button 
                            onClick={handleDeleteProfilePicture}>
                                Delete Profile Picture
                        </button>
                    </div>
                )}
            </div>

            <div className="profile-body">
                <p className="user-bio">{user?.bio}</p>
                
                <div className="user-posts">
                    <PostItemIndex userId={user?.id} />
                </div>
            </div>
            
        </div>
    )
}

export default ProfilePage;