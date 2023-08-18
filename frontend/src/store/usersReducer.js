import csrfFetch from "./csrf";

// CONSTANTS

export const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const RECEIVE_USER = 'users/RECEIVE_USER';
export const REMOVE_USER = 'users/REMOVE_USER';
export const RECEIVE_USER_ERRORS = 'users/RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'users/CLEAR_USER_ERRORS';

// ACTION CREATORS

export const receiveUsers = (users) => ({ type: RECEIVE_USERS, users });
export const receiveUser = (user) => ({ type: RECEIVE_USER, user });
export const removeUser = (userId) => ({ type: REMOVE_USER, userId });
export const receiveUserErrors = (errors) => ({ type: RECEIVE_USER_ERRORS, errors });

// SELECTORS

export const getUsers = (state) => Object.values(state.users);
export const getUser = (userId) => (state) => state.users[userId];

// THUNK ACTION CREATORS

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users');

    if (res.ok) {
        const users = await res.json();
        dispatch(receiveUsers(users));
    } else {
        const errors = await res.json();
        dispatch(receiveUserErrors(errors));
    }
}

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);

    if (res.ok) {
        const user = await res.json();
        dispatch(receiveUser(user));
    } else {
        const errors = await res.json();
        dispatch(receiveUserErrors(errors));
    }
}

export const updateUser = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: user
    });

    if (res.ok) {
        const user = await res.json();
        dispatch(receiveUser(user));
        return user;
    } else {
        const errors = await res.json();
        dispatch(receiveUserErrors(errors));
    }
}

export const deleteUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeUser(userId));
    } else {
        const errors = await res.json();
        dispatch(receiveUserErrors(errors));
    }
}

// REDUCER

const usersReducer = (state = {}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_USERS:
            return { ...state, ...action.users };
        case RECEIVE_USER:
            nextState[action.user.id] = action.user;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }  
}

export default usersReducer;