import React, { Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import { withRouter } from 'react-router-dom';
import api from '../apis';
import Typography from '@material-ui/core/Typography';

class LinkBank extends Component {

    constructor(props){
        super(props);

        console.log(this.props)

        this.state = {
            linkToken:  '',
            accounts: [],
            accessToken: [],
            email: this.props.props.email,
            institution: this.props.props.institution
        };

        const url = '/LinkToken'

        api.get(url)
        .then(res => {
            this.setState({
                linkToken: res.data.link_token
            });
        })

    }

    // Get Transaction Data using the access token received

    transactionData = (accessToken) => {

        const url = '/TransactionDetails'

        const req =  [];
        
        req.push({
            access_token: accessToken,
            institution: this.state.institution
        });

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            this.setState({
                accounts: res.data
            })
        })
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

            this.transactionData(res.data.access_token);
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

        console.log( req );

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            console.log(res.data)
        })
    }

    redirectToLogin(){
        const loggedIn = { access_token: this.state.accessToken, accounts: this.state.accounts, email: this.state.email, loggedIn: true }

        sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));

        this.props.history.push('/');
    }

    render() {
        return (
                <div className= "Plaid">
                    {this.state.accounts.length > 0 && 
                        <>
                            { this.redirectToLogin() }
                        </>
                    }
                    {this.state.accounts.length < 1 && 
                    <> 
                        <Typography variant="h6">
                            Link Bank Account
                        </Typography>
                        <br/>  
                        <PlaidLink
                        token= {this.state.linkToken}
                        onSuccess={this.onSuccess}
                        >
                                Connect to bank
                        </PlaidLink>
                    </>
                    }
                </div>
        );
    }
}
export default withRouter(LinkBank);
