import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPosts } from '../../store/postsReducer';
import PostItem from '../PostItem/PostItem';

const PostItemIndex = () => {
    const currentUser = useSelector(state => state.session.user);
    const userPosts = useSelector(getPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(currentUser.id));
    }, []);

    if (userPosts.length === 0) {
        return <div>You haven't posted anything yet.</div>
    }

    return (
        <div className="user-posts-container">
            <h2>Your Posts</h2>

            <ul>
                {userPosts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </div>
    );
}

export default PostItemIndex;
