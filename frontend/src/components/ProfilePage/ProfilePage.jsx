import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUser, getUser, updateUser } from "../../store/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsPersonCircle } from 'react-icons/bs';
import { GiPhotoCamera } from 'react-icons/gi';
import { BsFillPencilFill } from 'react-icons/bs';
import PostItemIndex from "../PostItemIndex/PostItemIndex";
import './ProfilePage.css';
import CreatePostButton from "../CreatePost/CreatePostButton";
import CreatePostModal from "../CreatePost/CreatePostModal";

const ProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [profilePictureDropdown, setProfilePictureDropdown] = useState(false);
    const [coverPhotoDropdown, setCoverPhotoDropdown] = useState(false);
    
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        dispatch(fetchUser(userId));
    }, [dispatch, userId]);
    
    const createPost = (post) => {
        dispatch(createPost(post));
    }

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
            <div className="header-background">
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
                            <label class="dropdown-label">Update Cover Photo
                                <input 
                                    type="file"
                                    onChange={handleChangeCoverPhoto}
                                    onClick={e => e.stopPropagation()}
                                />
                            </label>
                        </div>
                    )}
                </div>
                
                <div className="profile-header">
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
                                <label class="dropdown-label">Update Profile Picture
                                    <input 
                                        type="file"
                                        onChange={handleChangeProfilePicture}
                                        onClick={e => e.stopPropagation()}
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                    
                    <div className="profile-info">
                        <div className="left-profile-header">
                            <h1 className="user-name">{user.firstName} {user.lastName}</h1>
                            <p>173 friends</p>
                        </div>

                        <div className="right-profile-header">
                            {(user.id === sessionUser.id) ?
                                <button className="edit-profile-button"><span><BsFillPencilFill /></span> Edit Profile</button> :
                                <button className="add-friend-button">Add Friend</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-body">
                <p className="user-bio">{user.bio}</p>

                <div className="user-posts">
                <CreatePostButton openModal={openModal} currentUser={sessionUser} />
                {modalOpen &&
                    <CreatePostModal
                        closeModal={closeModal}
                        currentUser={sessionUser}
                        createPost={createPost}
                    />
                }
                    <PostItemIndex user={user} />
                </div>
            </div>
            
        </div>
    )
}

export default ProfilePage;