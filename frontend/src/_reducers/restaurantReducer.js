import { ActionTypes } from '../_constants';

const initialState = {
    signupStatus: ''
};

const restaurantReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_RESTAURANT:
            return Object.assign({}, state, {
                signupStatus: 'SUCCESS'
            });
        case ActionTypes.RES_MULTIPLE_USERS:
            return Object.assign({}, state, {
                signupStatus: 'DUP'
            });
        case ActionTypes.RES_ADD_FAILED:
            return Object.assign({}, state, {
                signupStatus: 'ERR'
            });
        default:
            return state;
    }
}

export default restaurantReducer;