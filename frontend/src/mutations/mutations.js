import { gql } from 'apollo-boost';

const UPDATE_PROFILE_QUERY = gql`
mutation ($owner_email: String, $store_name: String, $store_location: String, $description: String , $restaurant_img: String, $timings: String, $phone: String, $street: String, $state: String, $country: String, $pincode: String, $cuisine:String, $delivery_type:String, $dishes_type:String){
    updateRestaurantProfile(owner_email: $owner_email, store_name: $store_name, store_location: $store_location, description: $description , restaurant_img: $restaurant_img, timings: $timings, phone: $phone, street: $street, state: $state, country: $country, pincode: $pincode, cuisine: $cuisine, delivery_type: $delivery_type, dishes_type: $dishes_type){
        success
    }
}`

const CREATE_RESTAURANT_QUERY = gql`
mutation ($owner_email: String, $store_name: String, $store_location: String){
    createRestaurantProfile(owner_email: $owner_email, store_name: $store_name, store_location: $store_location){
        success
    }
}`

const CREATE_USER_QUERY = gql`
mutation ($user_name: String, $user_emailId: String, $user_pwd: String, $restaurant_owner: String){
    createUser(user_name: $user_name, user_emailId: $user_emailId, user_pwd: $user_pwd, restaurant_owner: $restaurant_owner){
        success
    }
}`

const CREATE_DISH_QUERY = gql`
mutation ($owner_email: String, $dish_name: String, $dish_description: String, $dish_price: String, $dish_ingredients: String, $dish_category: String, $dish_img: String){
    saveRestaurantDish(owner_email: $owner_email, dish_name: $dish_name, dish_description: $dish_description, dish_price: $dish_price, dish_ingredients: $dish_ingredients, dish_category: $dish_category, dish_img: $dish_img){
        success
    }
}`

const CREATE_ORDER_QUERY = gql`
mutation ($cust_email_id: String, $restaurant_id: String, $restaurant_name: String, $dishes_ordered: String, $delivery_address: String, $order_timestamp: String, $order_price: String, $payment_mode: String, $status: String, $message: String){
    placeOrder(cust_email_id: $cust_email_id, restaurant_id: $restaurant_id, restaurant_name: $restaurant_name, dishes_ordered: $dishes_ordered, delivery_address: $delivery_address, order_timestamp: $order_timestamp, order_price: $order_price, payment_mode: $payment_mode, status: $status, message: $message){
        success
    }
}`

const UPDATE_ORDER_STATUS = gql`
mutation ($_id: String, $status: String){
    updateOrderStatus(_id: $_id, status: $status){
        success
    }
}`

export {
    UPDATE_PROFILE_QUERY, 
    CREATE_RESTAURANT_QUERY , 
    CREATE_USER_QUERY, 
    CREATE_DISH_QUERY,
    CREATE_ORDER_QUERY,
    UPDATE_ORDER_STATUS
};