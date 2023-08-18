import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from "./sessionReducer";

// CONSTANTS

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const REMOVE_POST = 'posts/REMOVE_POST';
export const RECEIVE_POST_ERRORS = 'posts/RECEIVE_POST_ERRORS';
export const CLEAR_POST_ERRORS = 'posts/CLEAR_POST_ERRORS';

// ACTION CREATORS

export const receivePosts = (posts) => ({ type: RECEIVE_POSTS, posts });
export const receivePost = (post) => ({ type: RECEIVE_POST, post });
export const removePost = (postId) => ({ type: REMOVE_POST, postId });
export const receivePostErrors = (errors) => ({ type: RECEIVE_POST_ERRORS, errors });

// SELECTORS

export const getPosts = (state) => Object.values(state.posts);
export const getPost = (state, postId) => state.posts[postId];

// THUNK ACTION CREATORS

export const fetchPosts = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/posts?userId=${userId}`);

    if (res.ok) {
        const posts = await res.json();
        dispatch(receivePosts(posts));
    } else {
        const errors = await res.json();
        dispatch(receivePostErrors(errors));
    }
}

export const fetchPost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`);

    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
    } else {
        const errors = await res.json();
        dispatch(receivePostErrors(errors));
    }
}

export const createPost = (post) => async dispatch => {
    const res = await csrfFetch('/api/posts', {
        method: 'POST',
        body: post
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
        return post;
    } else {
        const errors = await res.json();
        dispatch(receivePostErrors(errors));
    }
}

export const updatePost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
        return post;
    } else {
        const errors = await res.json();
        dispatch(receivePostErrors(errors));
    }
}

export const deletePost = (postId) => async dispatch => { 
    const res = await csrfFetch(`/api/posts/${postId}`, { 
        method: 'DELETE' 
    });

    if (res.ok) {
        dispatch(removePost(postId));
    } else {
        const errors = await res.json();
        dispatch(receivePostErrors(errors));
    }
}

// REDUCER

const postsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts;       
        case RECEIVE_POST:
            nextState[action.post.id] = action.post;
            return nextState;
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        case REMOVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default postsReducer;