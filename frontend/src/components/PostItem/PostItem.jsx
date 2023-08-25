import { useEffect, useState } from "react";
import { deletePost, updatePost } from "../../store/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../util/formatDate";
import { BsThreeDots } from 'react-icons/bs';
import { BsPersonCircle } from 'react-icons/bs';
import { IoChevronBackOutline } from 'react-icons/io5';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { IoMdPhotos } from 'react-icons/io';
import { BsPersonPlusFill } from 'react-icons/bs';
import { BsFiletypeGif } from 'react-icons/bs';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './PostItem.css'
import { fetchCommentsByPostId, getTopLevelCommentsByPostId } from "../../store/commentsReducer";
import Comment from "../Comment/Comment";
import CommentInput from "../Comment/CommentInput";
import ReactionInput from "../Reaction/ReactionInput";
import ReactionSummary from "../Reaction/ReactionSummary";

const PostItem = ({ post }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedPostBody, setEditedPostBody] = useState(post.body);
    const dispatch = useDispatch();
    const [imageIndex, setImageIndex] = useState(0);
    const postTopLevelComments = useSelector(getTopLevelCommentsByPostId(post.id));
    const [photoFiles, setPhotoFiles] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

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
        const updatedPostFormData = new FormData();
        updatedPostFormData.append('post[body]', editedPostBody);
        
        if (photoFiles.length !== 0) {
            Array.from(photoFiles).forEach((photo) => {
                updatedPostFormData.append('post[photos][]', photo);
            })
        }

        dispatch(updatePost(updatedPostFormData, post.id));
        setEditMode(false);
    }

    useEffect(() => { 
        dispatch(fetchCommentsByPostId(post.id, false));
    }, [dispatch, post.id]);
    
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
                    {sessionUser.id === post.authorId && (
                        <>
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
                        </>
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
                        <div  
                            className="add-on-icons">
                            <label className ="photo-icon-label">
                                <IoMdPhotos className="photo-icon" />
                                <input 
                                    type="file" 
                                    onChange={e => setPhotoFiles(e.target.files)}
                                    multiple 
                                />  
                            </label>
                            <BsPersonPlusFill className="tag-icon" />
                            <BsFiletypeGif className="gif-icon" />
                        </div>

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

            <div className = "post-reactions">
                <ReactionSummary reactable={post} reactableType='Post' />
                <ReactionInput reactable={post} reactableType='Post' sessionUser={sessionUser} />
            </div>

            <div className="comments-section">
                {postTopLevelComments.map(comment => (
                    <Comment 
                        className="parent-comment"
                        comment={comment} 
                        post={post} 
                        key={comment.id} 
                        sessionUser={sessionUser} 
                    />
                ))}
            </div>

            <div className="comment-input">
                <CommentInput 
                    postId={post.id}
                    parentCommentId={null}
                    sessionUser={sessionUser}
                />
            </div>
        </li>
    );
}

export default PostItem;
