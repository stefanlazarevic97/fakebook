import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import NewsFeed from './components/NewsFeed/NewsFeed';

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/login">
                    <LoginFormPage />
                </Route>

                <Route path="/">
                    <NewsFeed />
                </Route>
            </Switch>
        </>
    );
}

export default App;
