import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import api from '../apis';
import ListAccounts from '../functional_components/ListAccounts';
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

             console.log(this.state)
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
            console.log(res.data);
            this.setState({
                accounts: res.data,
                error: ''
            })

            const loggedIn = { access_token: accessToken, accounts: res.data, loggedIn: true }

            console.log(this.state);

            sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        })
    }

    loginForm = (classes) => {
        console.log('Display login form');

        console.log(classes.input)
        return(
            <div>
                 {this.state.error.length > 0 &&
                    <Alert severity="error"> {this.state.error}</Alert>
                }   
                <Typography variant="h6">
                    Login
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
        );
    }


    isLoggedIn = (classes) => {
        if(this.state.accounts.length < 1){
            return this.loginForm(classes);
        } else{
            return (
                <ListAccounts props={this.state}/>     
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
            this.setState({
                accessToken: res.data
            });

            this.transactionData(res.data);
        })
        .catch(err => {
            this.setState({
                error: 'Invalid username/password',
                password: ''
            })
        })
    } 

    render(){

        const { classes } = this.props;
        const loggedIn = this.isLoggedIn(classes);

        console.log(classes)

        return(
            <div>
                {loggedIn}
            </div>
        );
    }
}

export default withRouter((withStyles(styles)(Login)));