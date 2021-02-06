import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.png';

const useStyles = makeStyles(() => ({
    root: {
      maxWidth: 500,
      marginTop: 50,
      /*height: '95vh',*/
      paddingTop: 30,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
    }
  }));

export default function MainCard({children}) {
    const classes = useStyles();

    return (
    <div>
        <CssBaseline />
        <Container maxWidth="sm">
            <Card className={classes.root} variant="outlined">
                <img src={logo}/>
                <Typography component="div" style={{  textAlign: 'center' }}>
                    { children }
                </Typography>
            </Card> 
        </Container>
    </div>
    );
}