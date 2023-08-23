import { useSelector, useDispatch } from "react-redux";
import { createComment, deleteComment, getCommentReplies, getComments, updateComment } from "../../store/commentsReducer";
import { BsPersonCircle } from 'react-icons/bs';
import formatDate from "../../util/formatDate";
import { useState } from "react";

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

    const handleCommentSubmit = (e, postId, parentCommentId = null) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const commentFormData = new FormData();
            commentFormData.append('comment[commenterId]', sessionUser.id);
            commentFormData.append('comment[postId]', postId);
            commentFormData.append('comment[body]', e.target.value.trim());
            commentFormData.append('comment[parentCommentId]', parentCommentId);
            if (photoFile) commentFormData.append('comment[photo]', photoFile);
            dispatch(createComment(commentFormData));
        }
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
                        <div>
                            <input 
                                type="text"
                                placeholder="Write a public reply..."
                                onKeyDown={e => handleCommentSubmit(e, post.id, comment.id)}
                                onClick={e => e.stopPropagation()}
                            />
                            <input
                                className="comment-photo-input"
                                type="file"
                                onChange={e => handleCommentSubmit(e.target.files[0])}
                            />
                        </div>
                    }
            </div>

            <div className="comment-input">
                {editMode ? (
                    <>
                        <textarea 
                            className="comment-body-input"
                            value={editedCommentBody}
                            onChange={e => setEditedCommentBody(e.target.value)}
                        />
                        <input
                            className="comment-photo-input"
                            type="file"
                            value={editedCommentPhoto}
                            onChange={e => setEditedCommentPhoto(e.target.files[0])}
                        />
                        <button onClick={handleUpdate}>Save</button>  
                        <button onClick={() => setEditMode(false)}>Cancel</button>                 
                    </>
                ) : (
                    post.body
                )}
            </div>

            <div className="comment-photo">
                {comment.photoUrl && <img src={comment.photoUrl} alt="comment" />}
            </div>
        </div>
    )
}

export default Comment;