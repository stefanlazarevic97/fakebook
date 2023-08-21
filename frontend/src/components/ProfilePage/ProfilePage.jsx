import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
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
import EditProfileModal from "./EditProfileModal";
import { createFriendship, deleteFriendship } from "../../store/friendshipsReducer";

const ProfilePage = () => {
    const { userId } = useParams();
    const user = useSelector(getUser(userId));
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [profilePictureDropdown, setProfilePictureDropdown] = useState(false);
    const [coverPhotoDropdown, setCoverPhotoDropdown] = useState(false);
    const sessionUserFriends = useSelector(state => state.session.user.friends);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);

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

    const handleEditProfile = () => {
        openEditModal();
    }

    const isFriends = () => {
        sessionUserFriends.includes(user);
    }

    const handleFriendClick = () => {
        if (isFriends) {
            dispatch(deleteFriendship(user.id));
        } else {
            dispatch(createFriendship(user.id));
        }
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
                            <label className="dropdown-label">Update Cover Photo
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
                                <label className="dropdown-label">Update Profile Picture
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
                            <Link to={`/users/${user.id}/friends`}>{user.friends.count} friends</Link>
                        </div>

                        <div className="right-profile-header">
                            {(user.id === sessionUser.id) ?
                                <button 
                                    className="edit-profile-button"
                                    onClick={handleEditProfile}>
                                        <span><BsFillPencilFill /></span> Edit Profile</button> :
                                <button 
                                    className="add-friend-button"
                                    onClick={handleFriendClick}>
                                        {isFriends ? "Remove Friend" : "Add Friend"}
                                </button>
                            }
                        </div>
                        
                        {editModalOpen && 
                            <EditProfileModal 
                            onClose={closeEditModal} 
                            user={sessionUser} 
                            />
                        }
                    </div>
                </div>
            </div>

            <div className="profile-body">
                <p className="user-bio">{user.bio}</p>

                <div className="user-posts">
                {user.id === sessionUser.id && 
                    <CreatePostButton openModal={openModal} currentUser={sessionUser} />}
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