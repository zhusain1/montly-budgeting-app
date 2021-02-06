import LinkBank from '../components/LinkBank';
import MainCard from './MainCard';
import '../App.css';

const App = (props) => (
    <MainCard>
        <h4> Monthly Expense Tracker </h4>
        <LinkBank children={props}/>
        <br/>
    </MainCard>
);

export default App;