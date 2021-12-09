import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import store from "./_store";
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';


ReactDOM.render(
    <Provider crossorigin store={store} > <App /> </Provider>,
    document.getElementById('root')
);