import React from 'react';
import LoggedInNavbar from '../functional_components/LoggedInNavbar';
import MainCard from '../functional_components/MainCard';
import ListAccounts from '../functional_components/ListAccounts';
import { useHistory } from "react-router";




export default function ListAccountsWrapper(props) {

    const history = useHistory();

    if (typeof props.location.state !== 'undefined'){
       return renderAccounts();
    } else{
        history.push('/');
        return null;
    } 


    function renderAccounts() {
        return (
            <>
                <>
                    <LoggedInNavbar />
                    <MainCard>
                        <ListAccounts props={props.location.state.data} />
                    </MainCard>
                </>
            </>
        );
    }
}