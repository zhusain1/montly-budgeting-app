import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import logo from '../logo.png';

const useStyles = makeStyles(() => ({
    root: {
        margin: '15px',
        marginBottom: '-2px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },

    nav: {
        background: '#232526', 
        background: '-webkit-linear-gradient(to top, #414345, #232526)', 
        background: 'linear-gradient(to top, #414345, #232526)', 
    }
  }));

export default function Navbar() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="relative" className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6" className={classes.root}>
                        <Link to='/'>
                            <img src={logo}/>
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.root}>
                        <Link to='/create'>
                            Create Account
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}