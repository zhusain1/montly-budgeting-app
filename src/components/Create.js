import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../apis';
import LinkBank from './LinkBank';
import Typography from '@material-ui/core/Typography';
import '../App.css';
import Alert from '@material-ui/lab/Alert';
import MainCard from '../functional_components/MainCard';
import Navbar from '../functional_components/Navbar'

class Create extends Component {

    constructor(props){
        super(props);

        this.state = {
           email: '',
           firstName: '',
           lastName: '',
           password: '',
           error: '',
           linkBank: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const url = '/createUser'

        const req = {
            email: this.state.email, 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
        };

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            console.log(res.data);

            console.log(this.state);

            this.setState({
                error: '',
                linkBank: true
            })
            
        })
        .catch(err => {
            this.setState({
                error: 'Please fill out all fields',
                linkBank: false
            })
        })
    } 

    linkBank = () => {
        if(this.state.linkBank){
            return(
                <LinkBank email={this.state.email}/>
            );
        } else{
            return this.createAccount();
        }
    }

    createAccount = () => {
        return(
            <div>
                {this.state.error.length > 0 &&
                 <Alert severity="error"> {this.state.error}</Alert>
                }
                 <Typography variant="h6">
                    Create Account
                </Typography>
                <form onSubmit={this.handleSubmit} autoComplete="off" >
                    <TextField id="username" label="email" onChange={e => this.setState({email: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="firstName" label="first name" onChange={e => this.setState({firstName: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="lastName" label="last name" onChange={e => this.setState({lastName: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="password" label="password" type="password" onChange={e => this.setState({password: e.target.value})}/>
                    <br/>
                    <br/>
                    <Button variant="outlined" type="submit">
                        Create
                    </Button>
                </form>
                <br/>
            </div>
        );
    }

    render(){

        const renderPage = this.linkBank();

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

export default Create;