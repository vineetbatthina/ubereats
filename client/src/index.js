import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import store from "./_store";

ReactDOM.render(
    <Provider store={store} > <App /> </Provider>,
    document.getElementById('root')
);