import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {
    Link
  } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      height: '100%'
    }
  }));

export default function ListAccounts({props}) {
    const classes = useStyles();


    return (
    <div className={classes.root}>
        <Typography variant="h6">
            Accounts
        </Typography>
        {props.accounts.map((account) =>
         <Accordion key={account.account_id}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>
               <span className="icon">
                <AccountBalanceIcon/>
               </span>
               <b className="accountName"> {account.name} </b> 
            </Typography>
         </AccordionSummary>
            <AccordionDetails>
                <div>
                    <Link
                        to={{
                            pathname: "/transactions" ,
                            state: { account: account, token: props.accessToken }
                        }}
                        className = "link"
                        >
                            View transactions
                    </Link>
                    <br/>
                    <b>Type:</b> {account.subtype}
                    <br/>
                    <b>Balance:</b> ${account.balances.current}
                </div>
            </AccordionDetails>
        </Accordion>)}           
    </div>
    );
}