import { useSelector, useDispatch } from "react-redux";
import { deleteComment, getCommentReplies, updateComment } from "../../store/commentsReducer";
import { BsPersonCircle } from 'react-icons/bs';
import formatDate from "../../util/formatDate";
import { useState } from "react";
import CommentInput from "./CommentInput";
import './Comment.css';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdPhotos } from 'react-icons/io';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Comment = ({ comment, post, sessionUser, className }) => {
    const dispatch = useDispatch();
    const [replyToParent, setReplyToParent] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedCommentBody, setEditedCommentBody] = useState(comment.body);
    const [editedCommentPhotoFile, setEditedCommentPhotoFile] = useState(comment.photoUrl);

    const commentReplies = useSelector(getCommentReplies(comment.id));

    const openReply = (parentCommentId) => (e) => {
        e.stopPropagation();
        setReplyToParent(parentCommentId);
    }

    const handleDelete = () => {
        dispatch(deleteComment(comment.id));
    }

    const handleEdit = () => {
        setEditMode(true);
        setDropdownOpen(false);
    }

    const handleUpdate = () => {
        const updatedCommentFormData = new FormData();
        updatedCommentFormData.append('comment[body]', editedCommentBody);
        if (editedCommentPhotoFile) updatedCommentFormData.append('comment[photo]', editedCommentPhotoFile);
        dispatch(updateComment(updatedCommentFormData, comment.id));
        setEditMode(false);
    }

    return (
        <div className={className}>
            <header className="comment-header">
                <div key={comment.id} className="left-comment-header">
                    <Link to={`/users/${comment.commenterId}`} className="commenter-link">
                        {comment.profilePictureUrl ?
                            <img 
                                src={comment.profilePictureUrl}
                                alt="profile" 
                                className="comment-profile-picture" 
                            /> : 
                            <BsPersonCircle className="profile-picture" />
                        }
                    </Link>

                    <div className="commenter-info">
                        <h3 className="commenter">{comment.commenter}</h3>
                        <p className="comment-date">{formatDate(comment.createdAt)}</p>
                    </div>
                </div>

                <div className="right-header">
                    {sessionUser.id === comment.commenterId && (
                        <>
                            <button 
                                onClick={() => setDropdownOpen(!dropdownOpen)} 
                                className="comment-dropdown-button"
                            >
                                <BsThreeDots />
                            </button>

                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <button onClick={handleEdit}>Edit Comment</button>
                                    <button onClick={handleDelete}>Delete Comment</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </header>

            <div className="comment-body">
                {editMode ? (
                    <>
                        <input
                            type="text" 
                            placeholder="Write a comment..."
                            value={editedCommentBody}
                            onChange={e => setEditedCommentBody(e.target.value)}
                        />
                        <div
                            className="add-on-icons">
                            <label className ="photo-icon-label">
                                <IoMdPhotos className="photo-icon" />
                                <input 
                                    type="file" 
                                    onChange={e => setEditedCommentPhotoFile(e.target.files[0])} 
                                />  
                            </label>
                        </div>

                        <button onClick={handleUpdate}>Save</button>  
                        <button onClick={() => setEditMode(false)}>Cancel</button>                 
                    </>
                ) : (
                    comment.body
                )}
            </div>
            
            <button onClick={ openReply(comment.id)}>Reply</button>
    
            {replyToParent === comment.id &&
                <CommentInput 
                    postId={post.id}
                    parentCommentId={comment.id}
                    sessionUser={sessionUser}
                />
            }

            <div className="comment-photo">
                {comment.photoUrl && <img src={comment.photoUrl} alt="comment" />}
            </div>

            <div className="comments-section">
                {commentReplies.map(comment => (
                    <Comment 
                        className="child-comment"
                        comment={comment} 
                        post={post} 
                        key={comment.id} 
                        sessionUser={sessionUser} />
                ))}
            </div>
        </div>
    )
}

export default Comment;