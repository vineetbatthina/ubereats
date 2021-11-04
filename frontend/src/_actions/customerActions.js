import { ActionTypes } from '../_constants';
import {createUser} from '../services/UserService'

export const addCustomerUser = (payload) => {

    return async dispatch => {
        console.log("Dispatching customer user creation");

        const return_code = await createUser(payload);
        if(return_code===200){
            dispatch({
                type: ActionTypes.ADD_CUSTOMER_USER,
                payload
            })
        }
        else if(return_code===301){
            console.log('Email Already Exists');
            dispatch({
                type: ActionTypes.MULTIPLE_USERS,
                payload
            })
        }
        else {
            dispatch({
                type: ActionTypes.USER_ADD_FAILED,
                payload
            })
        }
    }

}

export const updateCart = (payload) => {

    return async dispatch => {
        console.log("Updating Cart Action called");

        dispatch({
            type: ActionTypes.UPDATE_CART,
            payload
        })
    }

}


