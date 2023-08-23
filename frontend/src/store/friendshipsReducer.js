import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER, SET_CURRENT_USER } from "./sessionReducer";
import { RECEIVE_USER } from "./usersReducer";

// CONSTANTS

export const RECEIVE_FRIENDSHIPS = 'friendships/RECEIVE_FRIENDSHIPS';
export const RECEIVE_FRIENDSHIP = 'friendships/RECEIVE_FRIENDSHIP';
export const REMOVE_FRIENDSHIP = 'friendships/REMOVE_FRIENDSHIP';
export const RECEIVE_FRIENDSHIP_ERRORS = 'friendships/RECEIVE_FRIENDSHIP_ERRORS';

// ACTION CREATORS

export const receiveFriendships = (friendships) => ({ type: RECEIVE_FRIENDSHIPS, friendships });
export const receiveFriendship = (friendship) => ({ type: RECEIVE_FRIENDSHIP, friendship });
export const removeFriendship = (friendshipId) => ({ type: REMOVE_FRIENDSHIP, friendshipId });
export const receiveFriendshipErrors = (errors) => ({ type: RECEIVE_FRIENDSHIP_ERRORS, errors });

// SELECTORS

export const getFriendships = (state) => Object.values(state.friendships);

export const getFriendsByUserId = (userId) => (state) => {
    if (!userId) return [];

    const friendships = getFriendships(state).filter(friendship => 
        friendship.status === 'accepted' && 
        (friendship.userId === userId || friendship.friendId === userId));
    const friends = friendships.map(friendship => {
        const user1 = state.users[friendship.userId] || state.session.user;
        user1.friendshipId = friendship.id
        const user2 = state.users[friendship.friendId] || state.session.user;
        user2.friendshipId = friendship.id
        return user1.id === userId ? user2 : user1;
    })
    return friends;
}

export const getFriendRequestsByUserId = (userId) => (state) => {
    const friendships = getFriendships(state).filter(friendship => 
        friendship.status === 'pending' && 
        (friendship.friendId === userId));
    const friends = friendships.map(friendship => {
        const user1 = state.users[friendship.userId] || state.session.user;
        user1.friendshipId = friendship.id
        const user2 = state.users[friendship.friendId] || state.session.user;
        user2.friendshipId = friendship.id
        return user1.id === userId ? user2 : user1;
    })
    return friends;
}

export const getFriendship = (userId) => (state) => {
    const currentUserId = state.session.user?.id;

    if (!currentUserId) return null;

    const friendship = getFriendships(state).find(friendship => (
        (friendship.userId === currentUserId && friendship.friendId === userId) ||
        (friendship.userId === userId && friendship.friendId === currentUserId)
    ))
    
    return friendship;
}

// THUNK ACTION CREATORS

export const fetchFriendships = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/friendships?userId=${userId}`);

    if (res.ok) {
        const friendships = await res.json();
        dispatch(receiveFriendships(friendships));
    } else {
        const errors = await res.json();
        dispatch(receiveFriendshipErrors(errors));
    }
}

export const createFriendship = (friendship) => async dispatch => {
    const res = await csrfFetch('/api/friendships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(friendship)
    });

    if (res.ok) {
        const friendship = await res.json();
        dispatch(receiveFriendship(friendship));
        return friendship;
    } else {
        const errors = await res.json();
        dispatch(receiveFriendshipErrors(errors));
    }
}

export const acceptFriendRequest = (friendshipId) => async dispatch => {
    const res = await csrfFetch(`/api/friendships/${friendshipId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' })
    });

    if (res.ok) {
        const friendship = await res.json();
        dispatch(receiveFriendship(friendship));
    } else {
        const errors = await res.json();
        dispatch(receiveFriendshipErrors(errors));
    }
}

export const deleteFriendship = (friendshipId) => async dispatch => { 
    const res = await csrfFetch(`/api/friendships/${friendshipId}`, { 
        method: 'DELETE' 
    });

    if (res.ok) {
        dispatch(removeFriendship(friendshipId));
    } else {
        const errors = await res.json();
        dispatch(receiveFriendshipErrors(errors));
    }
}

// REDUCER

// const initialState = JSON.parse(sessionStorage.getItem("currentUser"))?.friendships || {};

const friendshipsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_FRIENDSHIPS:
            return { ...state, ...action.friendships };       
        case RECEIVE_FRIENDSHIP:
            nextState[action.friendship.id] = action.friendship;
            return nextState;
        case REMOVE_FRIENDSHIP:
            delete nextState[action.friendshipId];
            return nextState;
        case RECEIVE_USER:
            return { ...state, ...action.payload.friendships };
        case REMOVE_CURRENT_USER:
            return {};
        case SET_CURRENT_USER:
            return { ...state, ...action.payload.friendships };
        default:
            return state;
    }
}

export default friendshipsReducer;
