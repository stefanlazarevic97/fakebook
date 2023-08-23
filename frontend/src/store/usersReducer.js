import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./sessionReducer";

// CONSTANTS

export const RECEIVE_USERS = 'users/RECEIVE_USERS';
export const RECEIVE_USER = 'users/RECEIVE_USER';
export const REMOVE_USER = 'users/REMOVE_USER';
export const RECEIVE_USER_ERRORS = 'users/RECEIVE_USER_ERRORS';
export const RECEIVE_SEARCH_RESULTS = 'users/RECEIVE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'users/CLEAR_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'users/RECEIVE_SEARCH_ERRORS';

// ACTION CREATORS

export const receiveUsers = (users) => ({ type: RECEIVE_USERS, users });
export const receiveUser = (payload) => ({ type: RECEIVE_USER, payload });
export const removeUser = (userId) => ({ type: REMOVE_USER, userId });
export const receiveUserErrors = (errors) => ({ type: RECEIVE_USER_ERRORS, errors });
export const receiveSearchResults = (users) => ({ type: RECEIVE_SEARCH_RESULTS, users });
export const clearSearchResults = () => ({ type: CLEAR_SEARCH_RESULTS });
export const receiveSearchErrors = (errors) => ({ type: RECEIVE_SEARCH_ERRORS, errors });

// SELECTORS

export const getUser = (userId) => (state) => state.users[userId];
export const getSearchResults = (state) => Object.values(state.users.search);

// THUNK ACTION CREATORS

export const fetchUsers = (params) => async dispatch => {
    let baseUrl = '/api/users?';

    for (let key in params) {
        baseUrl = baseUrl + `${key}=${params[key]}&`
    }
    
    const res = await csrfFetch(baseUrl);

    if (res.ok) {
        const users = await res.json();
        dispatch(receiveSearchResults(users));
    } else {
        const errors = await res.json();
        dispatch(receiveUserErrors(errors));
    }
}

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(receiveUser(data));
    } else {
        const errors = await res.json();
        dispatch(receiveUserErrors(errors));
    }
}

export const updateUser = (user) => async dispatch => {
    const formData = new FormData();

    for (const key in user) {
        formData.append(`user[${key}]`, user[key]);
    }

    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: formData
    });

    if (res.ok) {
        const payload = await res.json();
        dispatch(receiveUser(payload));
        return payload;
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

const usersReducer = (state = { search: {} }, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case RECEIVE_USERS:
            return { ...state, ...action.users };
        case RECEIVE_USER:
            nextState[action.payload.user.id] = action.payload.user;
            return { ...nextState, ...action.payload.friends };
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        case SET_CURRENT_USER:
            return { ...state, ...action.payload.friends };
        case RECEIVE_SEARCH_RESULTS:
            return { ...state, search: action.users };
        case CLEAR_SEARCH_RESULTS:
            return { ...state, search: {} };
        default:
            return state;
    }  
}

export default usersReducer;