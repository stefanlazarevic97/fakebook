import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './reset.css';
import App from './App';
import configureStore from './store/store';
import csrfFetch, { restoreCSRF } from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
    window.store = store;
    window.csrfFetch = csrfFetch;
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
        <React.StrictMode>
            <Root />
        </React.StrictMode>
    );
}

if (sessionStorage.getItem("X-CSRF-Token") === null) {
    restoreCSRF().then(renderApplication);
} else {
    renderApplication();
}