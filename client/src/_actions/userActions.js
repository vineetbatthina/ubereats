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