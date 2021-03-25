import React, { Component } from 'react';
import '../App.css';
import api from '../apis';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FilterListIcon from '@material-ui/icons/FilterList';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import MainCard from '../functional_components/MainCard';
import LoggedInNavbar from '../functional_components/LoggedInNavbar';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

class Transactions extends Component {

    constructor(props){
        super(props);

        var tempAccount = '';
        var tempToken = '';

        //TODO: Refactor and get values from local storage

        if(typeof( this.props.location.state) === "undefined" || this.props.location.state === undefined){
            this.props.history.push('/');
        } else{
            tempAccount = this.props.location.state.account;
            tempToken = this.props.location.state.token;
        }

        this.state = {
            account: tempAccount,
            accessToken: tempToken,
            transactions: [],
            totalAmount: 0,
            categories: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.transactionData('/AccountTransactionDetails');
    }

    componentDidCatch(error, info) {
        this.props.history.push('/');
    }


    handleChange = (e) => {
        console.log(e.target.value)

        const req = {
            access_token : this.state.accessToken,
            account_id:  this.state.account.account_id,
            category: e.target.value
        };

        api({
            method: 'post',
            url: '/category/account',
            data: req
        }).then((res) => {
            this.setState({
                transactions: res.data.transactions,
            });
        })

        this.getCategoryList();
    }

    transactionData = (url) => {
        const req = {
            access_token : this.state.accessToken,
            account_ids:  this.state.account.account_id
        };

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            this.setState({
                transactions: res.data.transactions,
                totalAmount: res.data.totalAmount
            });

            this.getCategoryList();
        })
    }

    getCategoryData = (transaction) => {
        return(
            <div>
                <b> Category: </b>
                {transaction.category}
            </div>
        );
    }

    getTotalDepositAmount = () => {
        var total = 0;

        this.state.transactions.forEach(transaction => {
            if(transaction.amount > 0){
                total = total + transaction.amount;
            }
        });
        return total
    }

    sortLargeWithdrawls = () => {
        this.transactionData('/LowToHighSortedAccountTransactionDetails');
    }

    sortLargeTransaction = () => {
        this.transactionData('/SortedAccountTransactionDetails');
    }

    sortDateTransaction = () => {
        this.transactionData('/AccountTransactionDetails');
    }


    getCategoryList = () => {

        const req = {
            access_token : this.state.accessToken,
            account_id:  this.state.account.account_id,
        };

        console.log( req )

        let url = '/categories/account'

        api({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            // success
            this.setState({
                categories: res.data
            });
        })
        .catch(err => {
            // fail
        })
    }

    getListOptions = () =>  {
       
        // call endpoint to get distinct categories by account id
        return (
        this.state.categories.map((category, index) =>
            <MenuItem key={index} value={category}> 
                    {category}
            </MenuItem>
        ));
    }

    displayFilters = () => {
        return (
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <div className="filter">
                                <h4>
                                    <span className="icon">
                                        <FilterListIcon/>
                                    </span>
                                        Filter
                                    <br/>
                                </h4>
                            </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="filters">
                            <Button onClick={() => this.sortLargeTransaction()}>
                                Sort by largest deposit
                            </Button>
                            <Button onClick={() => this.sortDateTransaction()}>
                                Sort by date
                            </Button>
                            <Button onClick={() => this.sortLargeWithdrawls()}>
                                Sort by largest withdrawal
                            </Button>
                        </div>
                        <div className = "search">
                            <br/>
                            <FormControl>
                                <InputLabel id="filter_category">Filter Category</InputLabel>
                                <Select
                                    labelId="filter_category"
                                    id="filter_category_select"
                                    value={this.state.searchTransaction}
                                    onChange={this.handleChange}
                                    defaultValue = ""
                                >
                                    {this.getListOptions()}
                                </Select>
                            </FormControl>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        );
    }

    render(){
        return(
            <>
                <LoggedInNavbar/>
                    <MainCard>
                        <div style={{  fontWeight: 500 }}> 
                            {this.state.accessToken.length > 0 &&
                            <div id= "transactions">
                                <p>
                                    <b> Account Name: </b> {this.state.account.name}
                                </p>
                                <p>
                                    <b> Total balance:  </b> {formatter.format(this.state.account.balances.current)}
                                </p>
                                <p>
                                    <b> Monthly Spending:  </b> {formatter.format(this.state.totalAmount)}
                                </p>
                                <p>
                                    <b> Monthly Deposit:  </b> {formatter.format(this.getTotalDepositAmount())}
                                </p>
                                
                                {this.displayFilters()}
                                {this.state.transactions.map((transaction, index) =>
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography>
                                            <span className="icon">
                                                <AttachMoneyIcon/>
                                            </span>
                                            <b className="accountName"> {transaction.name} </b> 
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div>
                                                <b>Amount:</b> {formatter.format(transaction.amount)}
                                                <br/>
                                                <b>Date:</b>
                                                {' '}{transaction.date}
                                                <br/>
                                                {this.getCategoryData(transaction)}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>)}
                            </div>}
                        </div>
                    </MainCard>
            </>
        );
    }
}

export default  withRouter(Transactions);