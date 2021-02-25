import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import logo from '../logo.png';

const useStyles = makeStyles(() => ({
    root: {
        margin: '15px',
        marginBottom: '-2px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
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
        <div>
            <AppBar position="relative" className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6" className={classes.root}>
                        <Link to='/'>
                            <img src={logo} alt=""/>
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