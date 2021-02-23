import React, { Component } from 'react';
import LoggedInNavbar from '../functional_components/LoggedInNavbar';
import Navbar from '../functional_components/Navbar';

class DisplayNav extends Component {
    constructor(props){
        super(props);
    }
    
    displayNav = (loggedIn) => {

        console.log('display')

        if(loggedIn){
            return <LoggedInNavbar />
         } else{
            return <Navbar/>
         }
    }


    render(){
        return(
            <div>
              { this.displayNav() }
            </div>
        );
    }
}

export default DisplayNav;
