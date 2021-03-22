import React, { Component } from 'react';
import '../App.css';
import apis from '../apis';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import MainCard from '../functional_components/MainCard';
import LoggedInNavbar from '../functional_components/LoggedInNavbar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
            searchTransaction: ""
        };

        this.transactionData('/AccountTransactionDetails');
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidCatch(error, info) {
        this.props.history.push('/');
    }

    handleSearch = (e) => {
        e.preventDefault();
        console.log(this.state.searchTransaction);
        if(this.state.searchTransaction.length > 0){
            this.state.transactions.forEach(transaction => {
                if(transaction.name === this.searchTransaction){
                    let t = new Array(transaction);
                    this.setState({
                        transactions: t
                    });
                }
            });
        } 
    }

    transactionData = (url) => {
        const req = {
            access_token : this.state.accessToken,
            account_ids:  this.state.account.account_id
        };

        apis({
            method: 'post',
            url: url,
            data: req
        }).then((res) => {
            this.setState({
                transactions: res.data.transactions,
                totalAmount: res.data.totalAmount
            });
        })
    }

    getCategoryData = (transaction) => {
        return(
            <div>
                <b> Category: </b>
                {transaction.category.map((category, index) =>
                    <span key={index}> {category} </span>
                )}
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
                                    <br/>
                                    <form id="search_transaction" onSubmit={this.handleSearch}>
                                        <Autocomplete
                                            freeSolo
                                            disableClearable
                                            options={this.state.transactions.map((transaction) => transaction.name)}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Search transaction"
                                                InputProps={{ ...params.InputProps, type: 'search' }}
                                                onInputChange={(e, value) => this.setState({searchTransaction: e.target.value})} 
                                                value={this.state.searchTransaction}
                                            />
                                            )}
                                        />
                                    <Button className="searchTransaction" type="submit">
                                        search
                                    </Button>
                                    </form>
                                </h4>
                            </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Button onClick={() => this.sortLargeTransaction()}>
                            Sort by largest deposit
                        </Button>
                        <Button onClick={() => this.sortDateTransaction()}>
                            Sort by date
                        </Button>
                        <Button onClick={() => this.sortLargeWithdrawls()}>
                            Sort by largest withdrawal
                        </Button>
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
                        <div> 
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