import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser, getUser, updateUser } from "../../store/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsPersonCircle } from 'react-icons/bs';
import { GiPhotoCamera } from 'react-icons/gi';
import PostItemIndex from "../PostItemIndex/PostItemIndex";
import './ProfilePage.css';

const ProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user);
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

    const handleChangeProfilePicture = (e) => {
        const file = e.currentTarget.files[0];
        if (!file) return;
        const updatedUser = { ...user, profilePicture: file };
        dispatch(updateUser(updatedUser));
        setProfilePictureDropdown(false);
    }

    const handleChangeCoverPhoto = (e) => {
        const file = e.currentTarget.files[0];
        if (!file) return;
        const updatedUser = { ...user, coverPhoto: file };
        dispatch(updateUser(updatedUser));
        setCoverPhotoDropdown(false);
    }

    if (!sessionUser) return <Redirect to="/" />;
    if (!user) return null;

    return (
        <div className="profile-page">
            <div 
                className="cover-photo-container" 
                onClick={toggleCoverPhotoDropdown}>
                
                {user?.coverPhotoUrl ?
                    <img 
                        className="cover-photo" 
                        src={user.coverPhotoUrl} 
                        alt="cover" 
                    /> : 
                    <GiPhotoCamera className="cover-photo" />
                }
                {coverPhotoDropdown && (
                    <div className="cover-photo-dropdown-menu">
                        <input 
                            type="file"
                            onChange={handleChangeCoverPhoto}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
            
            <h1 className="user-name">{user.firstName} {user.lastName}</h1>

            <div 
                className="profile-picture-container" 
                onClick={toggleProfilePictureDropdown}>

                {user.profilePictureUrl ? 
                    <img 
                    className="profile-picture" 
                    src={user.profilePictureUrl} 
                    alt="profile" 
                    /> : 
                    <BsPersonCircle className="profile-picture" />
                }
                {profilePictureDropdown && (
                    <div className="profile-dropdown-menu">
                        <input 
                            type="file"
                            onChange={handleChangeProfilePicture}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>

            <div className="profile-body">
                <p className="user-bio">{user.bio}</p>

                <div className="user-posts">
                    <PostItemIndex user={user} />
                </div>
            </div>
            
        </div>
    )
}

export default ProfilePage;