import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';


const useStyles = makeStyles(() => ({
    card: {
      maxWidth: 500,
      marginTop: 80,
      paddingTop: 30,
      paddingBottom: 20, 
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
    }
  }));

export default function MainCard({children}) {
    const classes = useStyles();
    return (
    <React.Fragment>
        <CssBaseline />
        <Navbar/>
        <Container maxWidth="sm">
            <Card className={classes.card} variant="outlined">
                <Typography component="div" style={{  textAlign: 'center' }}>
                    { children }
                </Typography>
            </Card> 
        </Container>
    </React.Fragment>
    );
}