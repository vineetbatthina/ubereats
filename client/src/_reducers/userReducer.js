import { ActionTypes } from '../_constants';

const initialState = {
    users: [],
    signupStatus : ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_CUSTOMER_USER:
            return Object.assign({}, state, {
                users: state.users.concat(action.payload),
                signupStatus : 'SUCCESS'
            });
        case ActionTypes.MULTIPLE_USERS:
            return Object.assign({}, state, {
                signupStatus : 'DUP'
            });
        case ActionTypes.USER_ADD_FAILED:
            return Object.assign({}, state, {
                signupStatus : 'ERR'
            });
        default:
            return state;
    }
}

export default reducer;