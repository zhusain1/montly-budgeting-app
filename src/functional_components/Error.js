import '../App.css';
import MainCard from './MainCard';
import Navbar from './Navbar'
import {
    Link
  } from "react-router-dom";

const Error = () => (
    <div className="ErrorPage">
        <Navbar/>
        <MainCard>
            <h4> 
                Whoops. Page does not exist. <br/>
                <Link to ="/">
                    Go Home
                </Link>     
            </h4>               
        </MainCard>
    </div>  
);

export default Error;