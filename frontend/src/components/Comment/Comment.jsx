import { useSelector, useDispatch } from "react-redux";
import { createComment, deleteComment, getCommentReplies, getComments, updateComment } from "../../store/commentsReducer";
import { BsPersonCircle } from 'react-icons/bs';
import formatDate from "../../util/formatDate";
import { useState } from "react";
import CommentInput from "./CommentInput";

const Comment = ({ comment, post, sessionUser }) => {
    const comments = useSelector(getComments);
    const dispatch = useDispatch();
    const [replyToParent, setReplyToParent] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedCommentBody, setEditedCommentBody] = useState(comment.body);
    const [editedCommentPhoto, setEditedCommentPhoto] = useState(comment.photoUrl);
    const [photoFile, setPhotoFile] = useState(null);

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
        dispatch(updateComment({...comment, body: editedCommentBody, photoUrl: editedCommentPhoto}));
        setEditMode(false);
    }

    return (
        <div>
            <div key={comment.id} className="comment">
                {comment.profilePictureUrl ?
                    <img 
                        src={comment.profilePictureUrl}
                        alt="profile" 
                        className="comment-profile-picture" 
                    /> : 
                    <BsPersonCircle className="profile-picture" />
                }

                <div className="commenter-info">
                    <h3 className="commenter">{comment.commenter}</h3>
                    <p className="comment-date">{formatDate(comment.createdAt)}</p>
                </div>

                <button onClick={ openReply(comment.id)}>Reply</button>
    
                    {replyToParent === comment.id &&
                        <CommentInput 
                            postId={post.id}
                            parentCommentId={comment.id}
                            sessionUser={sessionUser}
                        />
                    }
            </div>

            <div className="comment-input">
                {editMode ? (
                    <>
                        <CommentInput 
                            postId={post.id}
                            parentCommentId={comment.id}
                            sessionUser={sessionUser}
                        />
                        <button onClick={handleUpdate}>Save</button>  
                        <button onClick={handleEdit}>Cancel</button>                 
                    </>
                ) : (
                    comment.body
                )}
            </div>

            <div className="comment-photo">
                {comment.photoUrl && <img src={comment.photoUrl} alt="comment" />}
            </div>
        </div>
    )
}

export default Comment;