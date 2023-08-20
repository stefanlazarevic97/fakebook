import csrfFetch from "./csrf";
import { REMOVE_CURRENT_USER } from "./sessionReducer";

// CONSTANTS

export const RECEIVE_FRIENDSHIPS = 'friendships/RECEIVE_FRIENDSHIPS';
export const RECEIVE_FRIENDSHIP = 'friendships/RECEIVE_FRIENDSHIP';
export const REMOVE_FRIENDSHIP = 'friendships/REMOVE_FRIENDSHIP';
export const RECEIVE_FRIENDSHIP_ERRORS = 'friendships/RECEIVE_FRIENDSHIP_ERRORS';
export const CLEAR_FRIENDSHIP_ERRORS = 'friendships/CLEAR_FRIENDSHIP_ERRORS';

// ACTION CREATORS

export const receiveFriendships = (friendships) => ({ type: RECEIVE_FRIENDSHIPS, friendships });
export const receiveFriendship = (friendship) => ({ type: RECEIVE_FRIENDSHIP, friendship });
export const removeFriendship = (friendshipId) => ({ type: REMOVE_FRIENDSHIP, friendshipId });
export const receiveFriendshipErrors = (errors) => ({ type: RECEIVE_FRIENDSHIP_ERRORS, errors });

// SELECTORS

export const getFriendships = (state) => Object.values(state.friendships);
export const getFriendship = (state, friendshipId) => state.friendships[friendshipId];

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

const friendshipsReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_FRIENDSHIPS:
            return action.friendships;       
        case RECEIVE_FRIENDSHIP:
            nextState[action.friendship.id] = action.friendship;
            return nextState;
        case REMOVE_FRIENDSHIP:
            delete nextState[action.friendshipId];
            return nextState;
        case REMOVE_CURRENT_USER:
            return {};
        default:
            return state;
    }
}

export default friendshipsReducer;
