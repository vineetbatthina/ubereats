import { ActionTypes } from '../_constants';

export function addCustomerUser(payload) {
    console.log("Dispatching customer user creation");
    return { type : ActionTypes.ADD_CUSTOMER_USER ,payload };
}