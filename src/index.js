// Import the React and ReactDOM Libaries
import ReactDOM from 'react-dom';
import React from 'react';
import Transactions from './components/Transactions';
import Login from './components/Login';
import Create from './components/Create';
import MainCard from './functional_components/MainCard';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

// Take the react component and show it on the screen
ReactDOM.render(
    <Router>
        <MainCard>
            <Switch>
                <Route exact path = "/" component={Login} />
                <Route exact path = "/create" component={Create} />
                <Route exact path="/transactions" component={Transactions} />
            </Switch>
        </MainCard>
    </Router>,
    document.querySelector('#root')
);
