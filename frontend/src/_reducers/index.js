import {combineReducers} from 'redux';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';
import customerReducer from './customerReducer';

export default combineReducers({
    userReducer : userReducer,
    restaurantReducer : restaurantReducer,
    customerReducer : customerReducer
});