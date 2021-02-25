import LinkBank from '../components/LinkBank';
import '../App.css';

const App = (props) => (
    <div>
        <h4> Monthly Expense Tracker </h4>
        <LinkBank children={props}/>
        <br/>
    </div>
);

export default App;