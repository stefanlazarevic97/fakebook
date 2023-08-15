// CONSTANTS

const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
const RECEIVE_POST = 'posts/RECEIVE_POST';
const REMOVE_POST = 'posts/REMOVE_POST';

// ACTION CREATORS

export const receivePosts = (posts) => ({ type: RECEIVE_POSTS, posts });
export const receivePost = (post) => ({ type: RECEIVE_POST, post });
export const removePost = (postId) => ({ type: REMOVE_POST, postId });

// SELECTORS

export const getPosts = (state) => Object.values(state.entities.posts);
export const getPost = (state, postId) => state.entities.posts[postId];

// THUNK ACTION CREATORS

export const fetchPosts = () => async dispatch => {
    const res = await fetch('/api/posts');

    if (res.ok) {
        const posts = await res.json();
        dispatch(receivePosts(posts));
    }
}

export const fetchPost = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`);

    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
    }
}

export const createPost = (post) => async dispatch => {
    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
        return post;
    }
}

export const updatePost = (post) => async dispatch => {
    const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const post = await res.json();
        dispatch(receivePost(post));
        return post;
    }
}

export const deletePost = (postId) => async dispatch => { 
    const res = await fetch(`/api/posts/${postId}`, { 
        method: 'DELETE' 
    });

    if (res.ok) {
        dispatch(removePost(postId));
    }
}

// REDUCER

const postsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.posts };
        case RECEIVE_POST:
            nextState[action.post.id] = action.post;
            return nextState;
        case REMOVE_POST:
            delete nextState[action.postId];
            return nextState;
        default:
            return state;
    }
}

export default postsReducer;