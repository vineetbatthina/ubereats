import { ActionTypes } from '../_constants';
import { login } from '../services/index';

export const loginUser = (credentials) => {

    return async dispatch => {
        console.log("Dispatching user login");

        const return_code = await login(credentials);
        if(return_code.code===200){
            dispatch({
                type: ActionTypes.USER_LOGIN_SUCCESSFUL,
                payload : return_code
            })
        }
        else {
            dispatch({
                type: ActionTypes.USER_LOGIN_FAILED_SUCCESSFUL,
                payload : return_code
            })
        }
    }

}

export const logOutUser = () => {

    return async dispatch => {
        console.log("Dispatching customer logout ");
        let payload = '';
        
        dispatch({
            type: ActionTypes.UPDATE_CART,
            payload
        })
    }

}

export const storeLocation = (payload) => {

    return async dispatch => {
        console.log("Dispatching entered Location ");
        
        dispatch({
            type: ActionTypes.STORE_LOCATION,
            payload
        })
    }

}