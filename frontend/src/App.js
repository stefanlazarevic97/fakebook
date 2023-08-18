import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Navigation from './components/Navigation/Navigation';
import { ModalProvider } from './context/Modal';

function App() {
    return (
        <>
            <ModalProvider>
                <Navigation />
                <Switch>
                    <Route path="/">
                        <NewsFeed />
                    </Route>
                    <Route path="/users/:userId">
                        
                    </Route>
                </Switch>
            </ModalProvider>
        </>
    );
}

export default App;
