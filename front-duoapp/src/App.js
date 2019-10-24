import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
    return (
        <div>
            <Route path="/" component={Home} exact={true} />
        </div>
    );
}

export default App;
