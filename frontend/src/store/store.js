import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    ui: uiReducer
})

const configureStore = (initialState = {}) => (
    legacy_createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
);

export default configureStore;