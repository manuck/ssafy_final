import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
    return (
        <div>
            <Route path="/" component={Home} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
        </div>
    );
}

export default App;
