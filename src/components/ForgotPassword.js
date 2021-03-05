import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../apis';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import Alert from '@material-ui/lab/Alert';
import MainCard from '../functional_components/MainCard';
import Navbar from '../functional_components/Navbar'
import { withRouter } from 'react-router-dom';

class ForgotPassword extends Component {

    constructor(props){
        super(props);

        this.state = {
            email : '',
            error: '',
            emailCode: '',
            password: '',
            confirmPassword: '',
            showEmailCodePage: false,
            showResetPasswordPage: false,
            redirect: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailCodeSubmit = this.handleEmailCodeSubmit.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    handleEmailCodeSubmit = (e) => {

        e.preventDefault();

        const req = {
            email: this.state.email,
            emailCode: this.state.emailCode
        }

        this.callServer('/validateCode', req, 'showResetPasswordPage')
    } 

    handleResetPassword = (e) => {

        e.preventDefault();

        const req = {
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            email: this.state.email
        }

        api({
            method: 'post',
            url: '/updatePassword',
            data: req
        }).then((res) => {
            this.props.history.push('/');
        }).catch(err => {
            this.setState({
                error: err.response.data               
            })
        })
    } 


    callServer = (url, req, prop) => {

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            this.setState({
                error: '' ,
                [prop]: true             
            })
        }).catch(err => {
            this.setState({
                error: err.response.data               
            })
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();

        const req = {
            email: this.state.email
        }

        this.callServer('/sendEmail', req, 'showEmailCodePage')
    } 

    resetPassword = () => {
        return (
            <div>
                {this.state.error.length > 0 &&
                 <Alert severity="error"> {this.state.error}</Alert>
                }
                 <Typography variant="h6">
                    Reset Password
                </Typography>
                <form onSubmit={this.handleResetPassword} autoComplete="off" >
                    <TextField id="Password" 
                        label="Password"
                        type = "password"
                        value={this.state.password}
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <br/>
                    <TextField id="confirmPassword" 
                        label="Confirm Password"
                        type = "password"
                        value={this.state.confirmPassword}
                        onChange={e => this.setState({confirmPassword: e.target.value})}
                    />
                    <br/>
                    <br/>
                    <Button variant="outlined" type="submit">
                        Reset
                    </Button>
                </form>
                <br/>
            </div>
        );        
    }

    enterEmailCode = () => {
        return (
            <div>
                {this.state.error.length > 0 &&
                 <Alert severity="error"> {this.state.error}</Alert>
                }
                 <Typography variant="h6">
                    Enter Email Code
                </Typography>
                <form className ="resetForm" onSubmit={this.handleEmailCodeSubmit} autoComplete="off" >
                    <TextField id="emailcode" 
                        label="Email Code"
                        value={this.state.emailCode}
                        onChange={e => this.setState({emailCode: e.target.value})}
                    />
                    <br/>
                    <br/>
                    <Button variant="outlined" type="submit">
                        Submit
                    </Button>
                </form>
                <br/>
            </div>
        );        
    }

    forgotPassword = () => {
        return(
            <div>
                {this.state.error.length > 0 &&
                 <Alert severity="error"> {this.state.error}</Alert>
                }
                 <Typography variant="h6">
                    Forgot Password
                </Typography>
                <form className ="emailForm" onSubmit={this.handleSubmit} autoComplete="off" >
                    <TextField id="username" label="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                    <br/>
                    <br/>
                    <Button variant="outlined" type="submit">
                        Submit
                    </Button>
                </form>
                <br/>
            </div>
        );
    }

    renderDisplay = () => {

        console.log(this.state)

        if(this.state.showResetPasswordPage){
            return this.resetPassword();  
        } else if(this.state.showEmailCodePage){
            return this.enterEmailCode();           
        } else{
            return this.forgotPassword();  
        }   
    }

    render(){

        const renderPage = this.renderDisplay();

        return(
            <>
                <Navbar/>
                <MainCard>
                    <>
                        { renderPage }
                    </>
                </MainCard>
            </>
        );
    }
}

export default withRouter(ForgotPassword);