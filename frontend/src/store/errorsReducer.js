import { RECEIVE_FRIENDSHIP, RECEIVE_FRIENDSHIPS, RECEIVE_FRIENDSHIP_ERRORS, REMOVE_FRIENDSHIP } from "./friendshipsReducer";
import { CLEAR_POST_ERRORS, RECEIVE_POST, RECEIVE_POSTS, RECEIVE_POST_ERRORS, REMOVE_POST } from "./postsReducer";
import { INITIATE_SEARCH, RECEIVE_SEARCH_ERRORS, RECEIVE_SEARCH_RESULTS } from "./searchReducer";
import { CLEAR_SESSION_ERRORS, RECEIVE_SESSION_ERRORS, REMOVE_CURRENT_USER, SET_CURRENT_USER } from "./sessionReducer";
import { RECEIVE_USER, RECEIVE_USERS, REMOVE_USER } from "./usersReducer";

const errorsReducer = (state = {
    session: [],
    users: [],
    posts: [],
    friendships: [],
    search: [],
    comments: [],
    reactions: []
}, action) => {
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
        case RECEIVE_USER:
            return { ...nextState, users: [] };
        case RECEIVE_USERS: 
            return { ...nextState, users: [] };
        case REMOVE_USER: 
            return { ...nextState, users: [] };
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
        case RECEIVE_FRIENDSHIPS:
            return { ...nextState, friendships: [] };
        case RECEIVE_FRIENDSHIP: 
            return { ...nextState, friendships: [] };
        case REMOVE_FRIENDSHIP:
            return { ...nextState, friendships: [] };
        case RECEIVE_FRIENDSHIP_ERRORS:
            return { ...nextState, friendships: action.payload.errors };
        case INITIATE_SEARCH:
            return { ...nextState, search: [] };
        case RECEIVE_SEARCH_RESULTS:
            return { ...nextState, search: [] };
        case RECEIVE_SEARCH_ERRORS:
            return { ...nextState, search: action.payload.errors };
        default:
            return state;
    }
}

export default errorsReducer;