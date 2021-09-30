import { ActionTypes } from '../_constants';
import {createRestaurant} from '../services/RestaurantService'

export const addRestaurant = (payload) => {

    return async dispatch => {
        console.log("Dispatching customer user creation");

        const return_code = await createRestaurant(payload);
        if(return_code===200){
            dispatch({
                type: ActionTypes.ADD_RESTAURANT,
                payload
            })
        }
        else if(return_code===301){
            console.log('Email Already Exists');
            dispatch({
                type: ActionTypes.RES_MULTIPLE_USERS,
                payload
            })
        }
        else {
            dispatch({
                type: ActionTypes.RES_ADD_FAILED,
                payload
            })
        }
    }

}
