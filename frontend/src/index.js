import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/store';
import { activateSessionModal, deactivateSessionModal } from './store/uiReducer';

const store = configureStore();

window.store = store;
window.activate = activateSessionModal;
window.deactivate = deactivateSessionModal;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider>
            <App />
        </Provider>
    </React.StrictMode>,
);
