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

        var propEmail = '';
        var propLinkBank = false;

        if(typeof( this.props.location.state) !== "undefined" || this.props.location.state !== undefined){
            propEmail = this.props.location.state.email;
            propLinkBank = true;
        } 

        this.state = {
           email: propEmail,
           firstName: '',
           lastName: '',
           password: '',
           error: '',
           institution: '',
           linkBank: propLinkBank
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
            institution: this.state.institution
        };

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            this.setState({
                error: '',
                linkBank: true
            })
            
        })
        .catch(err => {
            this.setState({
                error: err.response.data,
                password: '',
                institution: '',
                linkBank: false
            })
        })
    } 

    linkBank = () => {
        if(this.state.linkBank){
            return(
                <LinkBank props = {{ email: this.state.email, institution: this.state.institution}} />
            );
        } else{
            return this.createAccount();
        }
    }

    disableButton = () => {
        return !this.state.email || !this.state.firstName
        || !this.state.lastName || !this.state.password || !this.state.institution
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
                    <TextField id="username" label="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="firstName" label="first name" value={this.state.firstName} onChange={e => this.setState({firstName: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="lastName" label="last name" value={this.state.lastName} onChange={e => this.setState({lastName: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="password" label="password" value={this.state.password} type="password" onChange={e => this.setState({password: e.target.value})}/>
                    <br/>
                    <br/>
                    <TextField id="institution" label="bank" value={this.state.institution} onChange={e => this.setState({institution: e.target.value})}/>
                    <br/>
                    <br/>
                    <Button variant="outlined" type="submit" disabled = { this.disableButton() }>
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