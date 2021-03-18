import React, { Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import { withRouter } from 'react-router-dom';
import api from '../apis';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoggedInNavbar from '../functional_components/LoggedInNavbar';
import MainCard from '../functional_components/MainCard';

class AddBank extends Component {

    constructor(props){
        super(props);

        this.getLocalStorage();

        const url = '/LinkToken'

        api.get(url)
        .then(res => {
            this.setState({
                linkToken: res.data.link_token
            });
        })

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getLocalStorage = () => {

        if(sessionStorage.getItem('loggedIn') != null){

            console.log('Mounting and setting local state');

            const {accounts, access_token, email} = JSON.parse(sessionStorage.getItem('loggedIn'));

            this.state = {
                email: email,
                institution: '',
                accounts: accounts,
                accessToken: access_token,
                error: '',
                displayPlaidLink: false
             };
        } else{

            this.state = {
                displayPlaidLink: false,
                accounts: [],
                error: ''
             };

            console.log('redirecting back to login page');

            return this.props.history.push('/');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            displayPlaidLink: true
        });

        console.log(this.state);
    } 


    renderLink = () => {
        return (
            <>
                <Typography variant="h6">
                        Add bank
                </Typography>
                <br/>
                <PlaidLink
                token= {this.state.linkToken}
                onSuccess={this.onSuccess}
                >
                    Connect to bank
                </PlaidLink>
            </>
        );
    }

    displayLink = () => {
        if(this.state.displayPlaidLink){
            return this.renderLink();
        } 
        
        else{
            return this.addInstitution();
        }
    }

    // Add bank 

    addInstitution = () => {
        return(
            <div>
                {this.state.error.length > 0 &&
                 <Alert severity="error"> {this.state.error}</Alert>
                }
                <form onSubmit={this.handleSubmit} autoComplete="off" >
                    <TextField id="institution" label="Add bank" value={this.state.institution} onChange={e => this.setState({institution: e.target.value})}/>
                    <br/>
                    <br/>
                    <Button variant="outlined" type="submit">
                        Add
                    </Button>
                </form>
                <br/>
            </div>
        );
    }

    onSuccess = (token, metadata) => {
        // Call Token Exchange Endpoint

        const url = '/TokenExchange'

        const publicToken = {
            public_token : token
        };

        api({
            method: 'post',
            url: url,
            data: publicToken
        }).then((res) => {

            this.setState({
                accessToken: res.data.access_token
            })

            this.saveAccessToken(this.state.accessToken);
        })
    };

    // api call to save access token to DB for a specific user
    saveAccessToken = (accessToken) => {
        const url = '/updateToken'

        const req = {
            email: this.state.email, 
            access_token: accessToken,
            institution: this.state.institution
        };

        console.log(req)

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            console.log(res.data)

            this.transactionData(res.data)
        })
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

            sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));

            this.props.history.push('/');

        }).catch(err => {
            this.setState({
                error: 'Error logging in with account',
            })
        })
    }


    redirectToLogin(){
        const loggedIn = { access_token: this.state.accessToken, accounts: this.state.accounts, loggedIn: true }

        sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        this.props.history.push('/');
    }

    render() {
        return (
                <>
                     <LoggedInNavbar/>
                     <MainCard>
                        <div className= "Plaid">
                            { this.displayLink() }
                        </div>
                    </MainCard>
                </>
        );
    }
}
export default withRouter(AddBank);
