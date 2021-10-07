import { ActionTypes } from '../_constants';

const initialState = {
    loginStatus: false,
    isRestaurantOwner: '',
    users: [],
    signupStatus: ''
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.USER_LOGIN_SUCCESSFUL:
            return Object.assign({}, state, {
                loginStatus: true,
                isRestaurantOwner: action.payload.restaurantOwner,
            });
        case ActionTypes.USER_LOGIN_FAILED_SUCCESSFUL:
            return Object.assign({}, state, {
                signupStatus: 'ERR',
            });
        case ActionTypes.ADD_CUSTOMER_USER:
            return Object.assign({}, state, {
                users: state.users.concat(action.payload),
                signupStatus: 'SUCCESS',
            });
        case ActionTypes.MULTIPLE_USERS:
            return Object.assign({}, state, {
                signupStatus: 'DUP',
            });
        case ActionTypes.USER_ADD_FAILED:
            return Object.assign({}, state, {
                signupStatus: 'ERR',
            });
        case ActionTypes.LOG_OUT:
            return Object.assign({}, state, {
                loginStatus: false,
                isRestaurantOwner: '',
                signupStatus: ''
            });
        case ActionTypes.STORE_LOCATION:
            return Object.assign({}, state, {
                location : action.payload
            });
        default:
            return state;
    }
}

export default userReducer;