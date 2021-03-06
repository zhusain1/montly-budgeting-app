import React from 'react';
import { Link} from "react-router-dom";
import Box from '@material-ui/core/Box';

export default function Footer() {
    return (
        <div className="footer">
           <Box component="div" display="inline">
                <Link to= "/forgotpassword">
                    Forgot Password
                </Link> 
                &nbsp;&nbsp;&nbsp;
                <Link to= "/create">
                    Open New Account
                </Link>
           </Box>
        </div>
    );
}