import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getPosts } from '../../store/postsReducer';
import PostItem from '../PostItem/PostItem';
import './PostItemIndex.css';

const PostItemIndex = ({ user }) => {
    const userPosts = useSelector(getPosts, shallowEqual);
    const dispatch = useDispatch();

    const sortedUserPosts = [...userPosts].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
    });

    useEffect(() => {
        dispatch(fetchPosts(user?.id));
    }, [dispatch, user?.id]);

    if (sortedUserPosts.length === 0) {
        return <div>You haven't posted anything yet.</div>
    }

    return (
        <div className="user-posts-container">
            <h2>Posts</h2>

            <ul>
                {sortedUserPosts.map(post => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </div>
    );
}

export default PostItemIndex;
