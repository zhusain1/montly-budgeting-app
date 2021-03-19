import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
    root: {
        margin: '5px',
    },

    nav: {
        background: '#232526'
    }
  }));

export default function LoggedInNavbar() {
    
    const history = useHistory();

    const logout = () => {
        sessionStorage.clear();
        history.push('/logout');
    }

    const classes = useStyles();
    return (
        <div className = 'loggedInNavbar'>
            <AppBar position="relative" className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6" className={classes.root}>
                        <Link to='/'>
                        <div className='logo'>
                        </div>
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.root}>
                        <Link to='/addBank'>
                            Add Bank
                        </Link>
                    </Typography>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}