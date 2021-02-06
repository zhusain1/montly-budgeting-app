import React, { Component } from 'react';
import MainCard from '../functional_components/MainCard';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../App.css';
import {
	withRouter
} from 'react-router-dom';
import api from '../apis';
import ListAccounts from '../functional_components/ListAccounts';
import Alert from '@material-ui/lab/Alert';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
           email: '',
           password: '',
           accounts: [],
           accessToken: '',
           error: ''
        };

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
                accounts: res.data
            })
        })
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

            this.setState({
                error: ''
            })

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
        return(
            <MainCard> 
                {this.state.error.length > 0 &&
                     <Alert severity="error"> {this.state.error}</Alert>
                }
                <div>
                {this.state.accounts.length < 1 && 
                    <div>
                        <form onSubmit={this.handleSubmit} autoComplete="off">
                            <TextField id="username" label="email" onChange={e => this.setState({email: e.target.value})}/>
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
                    </div>}
                </div>

                {this.state.accounts.length > 0 && 
                    <ListAccounts props={this.state}/>
                }
            </MainCard>
        );
    }
}

export default withRouter(Login);