import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/postsReducer';
import { BsPersonCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { IoMdPhotos } from 'react-icons/io';
import './CreatePostModal.css';

const CreatePostModal = ({ closeModal, currentUser }) => {
    const [body, setBody] = useState('');
    const [imageFiles, setImageFiles] = useState([]); 
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch();
    const postErrors = useSelector(state => state.errors.posts);

    const handleFiles = ({ currentTarget }) => { 
        const files = currentTarget.files;
        setImageFiles(Array.from(files));

        if (files.length !== 0) {
            let filesLoaded = 0;
            const urls = [];

            Array.from(files).forEach((file, i) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);

                fileReader.onload = () => {
                    urls[i] = fileReader.result;

                    if (++filesLoaded === files.length) {
                        setImageUrls(urls);
                    }
                }
            })
        } else {
            setImageUrls([]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[authorId]', currentUser.id);
        formData.append('post[body]', body);

        if (imageFiles.length !== 0) {
            imageFiles.forEach((photo) => {
                formData.append('post[photos][]', photo);
            })
        }

        dispatch(createPost(formData));
        closeModal();
    }

    return (
        <>
            <div className="modal-backdrop"></div>
            <div className="create-post-modal">
                <div className="modal-header">
                    <h2>Create Post</h2>
                    <div className="close-button" onClick={closeModal}>
                        <IoClose className="close-button-x" />
                    </div>
                </div>
                
                <div className="modal-body">
                    <div className="user-info">
                        {currentUser.profilePictureUrl ? 
                            <img className="create-post-logo" src={currentUser.profilePictureUrl} alt="User Profile" /> : 
                            <BsPersonCircle className="create-post-logo" />
                        }
                        {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <textarea
                        className="bio-input"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        placeholder={`What's on your mind, ${currentUser.firstName}?`}
                    />
                    <div className="footer">
                        <p>Add to your post</p>
                        <div  
                            className="add-on-icons">
                            <label className ="photo-icon-label">
                                <IoMdPhotos className="photo-icon" />
                                <input 
                                    type="file" 
                                    onChange={handleFiles}
                                    multiple 
                                />  
                            </label>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button 
                        className="submit-button" 
                        onClick={handleSubmit}>
                            Post
                    </button>
                </div>

                <ul className="error-list">
                    {postErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </div>
        </>
    );
}

export default CreatePostModal;