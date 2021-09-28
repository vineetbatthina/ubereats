import { ActionTypes } from '../_constants';

const initialState = {
    users : []
};

const reducer = (state = initialState , action) => {
    
    switch(action.type){
        case ActionTypes.ADD_CUSTOMER_USER :
            return Object.assign({}, state, {
                users: state.users.concat(action.payload)
              });
        default:
            return state;
    }
}

export default reducer;