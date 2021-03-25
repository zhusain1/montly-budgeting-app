import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import api from '../apis';
import MainCard from '../functional_components/MainCard';
import Navbar from '../functional_components/Navbar';
import Footer from '../functional_components/Footer';
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

            const {accounts, access_token, email} = JSON.parse(sessionStorage.getItem('loggedIn'));

            this.state = {
                email: email,
                password: '',
                accounts: accounts,
                accessToken: access_token,
                error: '',
             };
        } else{
            this.state = {
                email: '',
                password: '',
                accounts: '',
                accessToken: [],
                error: '',
             };
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    transactionData = (accessToken) => {

        const url = '/TransactionDetails'

        const req = accessToken;

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {       
            
            console.log(res)
            
            this.setState({
                accounts: res.data,
                error: ''
            })

            const loggedIn = { access_token: accessToken, accounts: res.data, email: this.state.email, loggedIn: true }

            console.log(this.state);

            sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        }).catch(err => {
            this.setState({
                error: 'Error logging in with account',
                email: '',
                password: ''
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
                            onChange={e => this.setState({email: e.target.value})} size="medium" value={this.state.email}/>
                            <br/>
                            <br/>
                            <TextField id="password" label="password" type="password" 
                            onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>
                            <br/>
                            <br/>
                            <Button variant="outlined" type="submit" disabled = {!this.state.email || !this.state.password}>
                                Login
                            </Button>
                            <br/>
                            <br/>
                            <Footer/>
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

            let data = this.state

            this.props.history.push({
                pathname: '/accounts',
                state: { data }
            })
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

            console.log(res.data.access_tokens.length)

            if(res.data.access_tokens.length > 0){

                console.log(res.data)

                this.setState({
                    accessToken: res.data.access_tokens
                });

                console.log(this.state.accessToken);
    
                this.transactionData( this.state.accessToken );
            } else{
                this.setState({
                    email: res.data.email[0]
                });


                this.props.history.push({
                    pathname: '/create',
                    state: { email: this.state.email[0] }
                  })
            }
        })
        .catch(err => {
            if(err.response){
                this.setState({
                    error: err.response.data.error,
                    password: ''
                })
            }
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