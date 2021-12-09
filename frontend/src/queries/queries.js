import { gql } from 'apollo-boost';

const GET_PROFILE_QUERY = gql`
query GET_PROFILE_QUERY($owner_email: String){
    restaurantProfile(owner_email: $owner_email){
            _id,
            store_name,
            store_location,
            owner_email,
            description,
            restaurant_img,
            timings, 
            phone,
            street,
            state,
            country,
            pincode,
            cuisine,
            delivery_type,
            dishes_type
    }
}`

const GET_RESTAURANT_PROFILE_ID = gql`
query GET_RESTAURANT_PROFILE_ID($_id: String){
    restaurantProfileById(_id: $_id){
            _id,
            store_name,
            store_location,
            owner_email,
            description,
            restaurant_img,
            timings, 
            phone,
            street,
            state,
            country,
            pincode,
            cuisine,
            delivery_type,
            dishes_type
    }
}`

const GET_RESTAURANT_DISHES = gql`
query GET_RESTAURANT_DISHES($owner_email: String){
    getRestaurantDishes(owner_email: $owner_email){
        _id,
        restaurant_id,
        dish_name,
        dish_description,
        dish_price,
        dish_ingredients,
        dish_category,
        dish_img
    }
}`

const GET_ALL_RESTAURANTS = gql`
query GET_ALL_RESTAURANTS{
    getAllRestaurants{
        _id,
            store_name,
            store_location,
            owner_email,
            description,
            restaurant_img,
            timings, 
            phone,
            street,
            state,
            country,
            pincode,
            cuisine,
            delivery_type,
            dishes_type
    }
}`

const GET_CUSTOMER_PROFILE = gql`
query GET_CUSTOMER_PROFILE($email_id: String){
    getCustomerProfile(email_id : $email_id){
        _id,
        name,
        DOB,
        email_id,
        phone,
        nick_name,
        DOB,
        address,
        favourites,
        profile_img
    }
}`

const GET_RESTAURANT_ORDERS = gql`
query GET_RESTAURANT_ORDERS($email_id: String){
    getOrdersByRestaurantId(email_id: $email_id){
        _id,
        cust_email_id, 
        restaurant_id, 
        restaurant_name, 
        dishes_ordered, 
        delivery_address, 
        order_timestamp, 
        order_price, 
        payment_mode, 
        status, 
        message
    }
}`

const GET_CUSTOMER_ORDERS = gql`
query GET_CUSTOMER_ORDERS($email_id: String){
    getOrdersForCustomer(email_id: $email_id){
        _id,
        cust_email_id, 
        restaurant_id, 
        restaurant_name, 
        dishes_ordered, 
        delivery_address, 
        order_timestamp, 
        order_price, 
        payment_mode, 
        status, 
        message
    }
}`

export { 
    GET_PROFILE_QUERY, 
    GET_RESTAURANT_DISHES, 
    GET_ALL_RESTAURANTS,
    GET_CUSTOMER_PROFILE,
    GET_RESTAURANT_PROFILE_ID,
    GET_RESTAURANT_ORDERS,
    GET_CUSTOMER_ORDERS
};