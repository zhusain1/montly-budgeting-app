// Import the React and ReactDOM Libaries
import ReactDOM from 'react-dom';
import React from 'react';
import Transactions from './components/Transactions';
import Login from './components/Login';
import Create from './components/Create';
import AddBank from './components/AddBank';
import ForgotPassword from './components/ForgotPassword';
import Logout from './functional_components/Logout'
import Error from './functional_components/Error'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

// Take the react component and show it on the screen
ReactDOM.render(
    <Router>
            <Switch>
                <Route exact path = "/" component={Login} />
                <Route exact path = "/create" component={Create} />
                <Route exact path = "/logout" component={Logout} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/addBank" component={AddBank} />
                <Route exact path="/ForgotPassword" component={ForgotPassword} />
                <Route component={Error} />
            </Switch>
    </Router>,
    document.querySelector('#root')
);
