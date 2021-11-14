import { ActionTypes } from '../_constants';

const initialState = {
    cart: '',
    reRender: false
};

const customerReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.UPDATE_CART:
            return Object.assign({}, state, {
                cart: action.payload,
            });
        case ActionTypes.RERENDER_DISH:
            console.log(state.reRender);
            console.log("Rerendering Dishes in reducer");
            return Object.assign({}, state, {
                reRender: !(state.reRender)
            });
        default:
            return state;
    }
}

export default customerReducer;