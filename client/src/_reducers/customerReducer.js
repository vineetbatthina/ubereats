import { ActionTypes } from '../_constants';

const initialState = {
    cart : ''
};

const customerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.UPDATE_CART:
            return Object.assign({}, state, {
                cart: action.payload,
            });
        default:
            return state;
    }
}

export default customerReducer;