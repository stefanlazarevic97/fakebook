import { useDispatch } from 'react-redux';
import { createComment } from '../../store/commentsReducer';
import { useState } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { BiSolidRightArrow } from 'react-icons/bi';

const CommentInput = ({ postId, parentCommentId, sessionUser }) => {
    const dispatch = useDispatch();
    const [photoFile, setPhotoFile] = useState(null);
    const [body, setBody] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const commentFormData = new FormData();
        commentFormData.append('comment[commenterId]', sessionUser.id);
        commentFormData.append('comment[postId]', postId);
        commentFormData.append('comment[body]', body);
        if (parentCommentId) commentFormData.append('comment[parentCommentId]', parentCommentId);
        if (photoFile) commentFormData.append('comment[photo]', photoFile);

        dispatch(createComment(commentFormData));
    };

    return (
        <form onSubmit={handleCommentSubmit} >
            <input 
                type="text"
                placeholder="Write a comment..."
                value={body}
                onChange={e => setBody(e.target.value)}
            />

            <label className ="comment-photo-icon-label">
                <IoMdPhotos className="photo-icon" />
                
                <input 
                    type="file" 
                    onChange={e => setPhotoFile(e.target.files[0])} 
                />  
            </label>

            <button><BiSolidRightArrow /></button>
        </form>
    );
};

export default CommentInput;
