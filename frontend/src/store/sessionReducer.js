import csrfFetch from "./csrf";

export const SET_CURRENT_USER = 'session/setCurrentUser';
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';
export const RECEIVE_SESSION_ERRORS = 'session/receiveSessionErrors';
export const CLEAR_SESSION_ERRORS = 'session/clearSessionErrors';

const setCurrentUser = payload => ({
    type: SET_CURRENT_USER,
    payload
});

const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
})

const receiveSessionErrors = (errorMessage) => ({
    type: RECEIVE_SESSION_ERRORS,
    payload: errorMessage
});

export function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        sessionStorage.removeItem("currentUser");
    }
}

export const login = ({ credential, password }) => async dispatch => {
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential, password })
    });

    if (res.ok) {
        const userData = await res.json();
        storeCurrentUser(userData);
        dispatch(setCurrentUser(userData));
        console.log(userData)
        return userData;
    } else {
        const errors = await res.json();
        dispatch(receiveSessionErrors(errors));
    }
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();
    console.log(data);
    storeCurrentUser(data);
    dispatch(setCurrentUser(data));
    return res;
}

export const signup = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: "POST",
        body: user
    });

    if (res.ok) {
        const userData = await res.json();
        storeCurrentUser(userData);
        dispatch(setCurrentUser(userData));
        return res;
    } else {
        const errors = await res.json();
        dispatch(receiveSessionErrors(errors));
    }
}

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE"
    });

    if (res.ok) {
        storeCurrentUser(null);
        dispatch(removeCurrentUser());
        return res;
    } else {
        const errors = await res.json();
        dispatch(receiveSessionErrors(errors));
    }
}

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))?.user || null,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.payload.user };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;