import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './sessionReducer';
import postsReducer from './postsReducer';
import errorsReducer from './errorsReducer';
import usersReducer from './usersReducer';
import friendshipsReducer from './friendshipsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    posts: postsReducer,
    friendships: friendshipsReducer,
    comments: commentsReducer,
    errors: errorsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;