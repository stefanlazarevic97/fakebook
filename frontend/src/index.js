import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './reset.css';
import App from './App';
import configureStore from './store/store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/sessionReducer';
import * as reactionActions from './store/reactions';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.csrfFetch = csrfFetch;
    window.sessionActions = sessionActions;
    window.reactionActions = reactionActions;
}

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    )
}

const renderApplication = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(
        <Root />
    );
}

store.dispatch(sessionActions.restoreSession()).then(renderApplication);

// if (sessionStorage.getItem("X-CSRF-Token") === null || JSON.parse(sessionStorage.getItem("currentUser")) === null) {
//     store.dispatch(sessionActions.restoreSession()).then(renderApplication);
// } else {
//     renderApplication();
// }