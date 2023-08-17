import { useState } from "react";
import { deletePost, updatePost } from "../../store/postsReducer";
import './PostItem.css'
import { useDispatch } from "react-redux";
import formatDate from "../../util/formatDate";

const PostItem = ({ post }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedPostBody, setEditedPostBody] = useState(post.body);
    const dispatch = useDispatch();

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
                <strong>{post.author}</strong>
                <span className="post-date">{formatDate(post.createdAt)}</span>
                <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    className="post-dropdown-button">
                        ...
                </button>

                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleEdit}>Edit Post</button>
                        <button onClick={handleDelete}>Delete Post</button>
                    </div>
                )}
            </header>
            
            <div className="post-images">
                {post.imageUrls && post.imageUrls.map(imageUrl => (
                    <img key={imageUrl} src={imageUrl} alt="" />
                ))}
            </div>

            <div className="post-body">
                {editMode ? (
                    <>
                        <textarea 
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
        </li>
    );
}

export default PostItem;
