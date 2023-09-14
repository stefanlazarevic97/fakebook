import { useDispatch } from 'react-redux';
import { createComment } from '../../store/commentsReducer';
import { useState } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { BiSolidRightArrow } from 'react-icons/bi';
import './CommentInput.css';

const CommentInput = ({ postId, parentCommentId, sessionUser }) => {
    const dispatch = useDispatch();
    const [photoFile, setPhotoFile] = useState(null);
    const [body, setBody] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const commentFormData = new FormData();
        commentFormData.append('comment[commenterId]', sessionUser.id);
        commentFormData.append('comment[postId]', postId);
        commentFormData.append('comment[body]', body);
        if (parentCommentId) commentFormData.append('comment[parentCommentId]', parentCommentId);
        if (photoFile) commentFormData.append('comment[photo]', photoFile);

        const res = await dispatch(createComment(commentFormData));

        if (res) {
            setBody('');
            setPhotoFile(null);
        }
    };

    return (
        <form onSubmit={handleCommentSubmit} className="comment-form" >
            <input 
                className="comment-input"
                type="text"
                placeholder="Write a comment..."
                value={body}
                onChange={e => setBody(e.target.value)}
            />

            <label className="comment-photo-icon-label">
                <IoMdPhotos className="photo-icon" />
                
                <input 
                    className="comment-file-input"
                    type="file" 
                    onChange={e => setPhotoFile(e.target.files[0])} 
                />  
            </label>

            <button className="comment-button"><BiSolidRightArrow /></button>
        </form>
    );
};

export default CommentInput;
