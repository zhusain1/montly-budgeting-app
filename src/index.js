// Import the React and ReactDOM Libaries
import ReactDOM from 'react-dom';
import React from 'react';
import App from './functional_components/App';
import Transactions from './components/Transactions';
import Login from './components/Login';
import Create from './components/Create';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

// Take the react component and show it on the screen
ReactDOM.render(
    <Router>
        <div>
            <AppBar position="static">
                <Typography variant="h6">
                    <Link color="inherit" to="/"> Login </Link> 
                    <Link  color="inherit" to="/create"> Create Account </Link> 
                </Typography>
            </AppBar>
            <Switch>
                <Route exact path = "/" component={Login} />
                <Route exact path = "/linkBank" component={App} />
                <Route exact path = "/create" component={Create} />
                <Route exact path="/transactions" component={Transactions} />
            </Switch>
        </div>
    </Router>,
    document.querySelector('#root')
);
