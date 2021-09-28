import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from "react-redux";
import persistStore from "./_store/index";

ReactDOM.render(
    <Provider store={persistStore().store} > <App /> </Provider>,
    document.getElementById('root')
);