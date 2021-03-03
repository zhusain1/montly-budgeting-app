import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import api from '../apis';
import ListAccounts from '../functional_components/ListAccounts';
import MainCard from '../functional_components/MainCard';
import Navbar from '../functional_components/Navbar';
import LoggedInNavbar from '../functional_components/LoggedInNavbar';
import Alert from '@material-ui/lab/Alert';

const styles = () => ({
    root: {
        color: "black"
    },
    input: {
        color: "black",
        borderBottom: "black",
        "&:hover": {
            borderBottom: "black"
        }
    }
});

class Login extends Component {
    constructor(props){
        super(props);

        if(sessionStorage.getItem('loggedIn') != null){

            console.log('Mounting and setting local state');

            const {accounts, access_token} = JSON.parse(sessionStorage.getItem('loggedIn'));

            this.state = {
                email: '',
                password: '',
                accounts: accounts,
                accessToken: access_token,
                error: ''
             };
        } else{
            this.state = {
                email: '',
                password: '',
                accounts: '',
                accessToken: '',
                error: ''
             };
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    transactionData = (accessToken) => {

        const url = '/TransactionDetails'

        const req = {
            access_token : accessToken,
        };

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {        
            this.setState({
                accounts: res.data,
                error: ''
            })

            const loggedIn = { access_token: accessToken, accounts: res.data, loggedIn: true }

            console.log(this.state);

            sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        }).catch(err => {
            this.setState({
                error: 'Error logging in with account'
            })
        })
    }

    loginForm = (classes) => {
        return(
            <>
                <Navbar/>
                <MainCard>
                    <div>
                        {this.state.error.length > 0 &&
                            <Alert severity="error"> {this.state.error}</Alert>
                        }   
                        <Typography variant="h6">
                            Sign in
                        </Typography>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField id="username" label="email" 
                            InputProps={{className: classes.input}}
                            onChange={e => this.setState({email: e.target.value})} size="medium"/>
                            <br/>
                            <br/>
                            <TextField id="password" label="password" type="password" onChange={e => this.setState({password: e.target.value})}/>
                            <br/>
                            <br/>
                            <Button variant="outlined" type="submit">
                                Login
                            </Button>
                        </form>
                        <br/>
                    </div>
                </MainCard>
            </>
        );
    }


    isLoggedIn = (classes) => {
        if(this.state.accounts.length < 1){
            return this.loginForm(classes);
        } else{
            return (
                <>
                    <LoggedInNavbar/>
                    <MainCard>
                        <ListAccounts props={this.state}/>  
                    </MainCard> 
                </>
            );
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const url = '/findUser'

        const req = {
            email: this.state.email, 
            password: this.state.password
        };

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            if(res.data.access_token.length !== 0){
                this.setState({
                    accessToken: res.data.access_token
                });
    
                this.transactionData(res.data.access_token);
            } else{
                this.setState({
                    email: res.data.email
                });


                this.props.history.push({
                    pathname: '/create',
                    state: { email: this.state.email }
                  })
            }
        })
        .catch(err => {

            this.setState({
                error: err.response.data.error,
                password: ''
            })
        })
    } 

    render(){

        const { classes } = this.props;
        const loggedIn = this.isLoggedIn(classes);
        
        return(
            <div>
                {loggedIn}
            </div>
        );
    }
}

export default withRouter((withStyles(styles)(Login)));