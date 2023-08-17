import { CLEAR_POST_ERRORS, RECEIVE_POST, RECEIVE_POSTS, RECEIVE_POST_ERRORS, REMOVE_POST } from "./postsReducer";
import { CLEAR_SESSION_ERRORS, RECEIVE_SESSION_ERRORS, REMOVE_CURRENT_USER, SET_CURRENT_USER } from "./sessionReducer";

const errorsReducer = (state = {session: [], posts: [], comments: [], reactions: []}, action) => {
    const nextState = { ...state };

    switch (action.type) {
        case REMOVE_CURRENT_USER:
            return { ...nextState, session: [] };
        case SET_CURRENT_USER:
            return { ...nextState, session: [] };
        case RECEIVE_SESSION_ERRORS:
            return { ...nextState, session: action.payload.errors };
        case CLEAR_SESSION_ERRORS: 
            return { ...nextState, session: [] };
        case RECEIVE_POST:
            return { ...nextState, posts: [] };
        case RECEIVE_POSTS:
            return { ...nextState, posts: [] };
        case REMOVE_POST:
            return { ...nextState, posts: [] };
        case RECEIVE_POST_ERRORS:
            return { ...nextState, posts: action.payload.errors };
        case CLEAR_POST_ERRORS:
            return { ...nextState, posts: [] };
        default:
            return state;
    }
}

export default errorsReducer;