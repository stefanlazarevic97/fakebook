import { useState } from "react";
import { deletePost, updatePost } from "../../store/postsReducer";
import { useDispatch } from "react-redux";
import formatDate from "../../util/formatDate";
import { BsThreeDots } from 'react-icons/bs';
import { BsPersonCircle } from 'react-icons/bs';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './PostItem.css'

const PostItem = ({ post }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedPostBody, setEditedPostBody] = useState(post.body);
    const dispatch = useDispatch();
    const [imageIndex, setImageIndex] = useState(0);

    const handlePrevImage = () => {
        if (imageIndex > 0) {
            setImageIndex(prevImageIndex => prevImageIndex - 1);
        }
    }

    const handleNextImage = () => {
        if (imageIndex < post.imageUrls.length - 1) {
            setImageIndex(prevImageIndex => prevImageIndex + 1);
        }
    }

    const handleDelete = () => {
        dispatch(deletePost(post.id));
    }

    const handleEdit = () => {
        setEditMode(true);
        setDropdownOpen(false);
    }

    const handleUpdate = () => {
        dispatch(updatePost({...post, body: editedPostBody}));
        setEditMode(false);
    }
    
    return (
        <li className="post-item">
            <header className="post-header">
                <div className="left-header">
                    <Link to={`/users/${post.authorId}`}>
                        <div className="user-picture">
                            {post.photoUrl ? 
                                <img className="post-item-logo" src={post.photoUrl} alt="profile" /> : 
                                <BsPersonCircle className="post-item-logo" />
                            }
                        </div>
                    </Link>
                    <div className="post-info">
                        <h3 className="post-author">{post.author}</h3>
                        <p className="post-date">{formatDate(post.createdAt)}</p>
                    </div>
                </div>

                <div className="right-header">
                    <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)} 
                        className="post-dropdown-button">
                            <BsThreeDots />
                    </button>

                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleEdit}>Edit Post</button>
                            <button onClick={handleDelete}>Delete Post</button>
                        </div>
                    )}
                </div>
            </header>
            
            <div className="post-body">
                {editMode ? (
                    <>
                        <textarea 
                            className="post-body-textarea"
                            value={editedPostBody}
                            onChange={e => setEditedPostBody(e.target.value)}
                        />
                        <button onClick={handleUpdate}>Save</button>  
                        <button onClick={() => setEditMode(false)}>Cancel</button>                 
                    </>
                ) : (
                    post.body
                )}
            </div>
            
            <div className="post-images">
                {imageIndex > 0 && <IoChevronBackOutline className="back-button" onClick={handlePrevImage} />}

                <img src={post.imageUrls[imageIndex]} alt="" />

                {imageIndex < post.imageUrls.length - 1 && <IoChevronForwardOutline className="next-button" onClick={handleNextImage} />}
            </div>
        </li>
    );
}

export default PostItem;
