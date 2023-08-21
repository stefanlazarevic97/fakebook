import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Navigation from './components/Navigation/Navigation';
import { ModalProvider } from './context/Modal';
import ProfilePage from './components/ProfilePage/ProfilePage';
import FriendIndex from './components/FriendsIndex/FriendIndex';

function App() {
    return (
        <>
            <ModalProvider>
                <Navigation />
                <Switch>
                    <Route path="/users/:userId/friends">
                        <FriendIndex />
                    </Route>
                    <Route path="/users/:userId">
                        <ProfilePage />
                    </Route>
                    <Route path="/">
                        <NewsFeed />
                    </Route>
                </Switch>
            </ModalProvider>
        </>
    );
}

export default App;
