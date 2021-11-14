const CustomerProfiles = require('../Models/CustomerProfiles');
const Restaurants = require('../Models/Restaurants');
const Orders = require('../Models/Orders');
const Dishes = require('../Models/Dishes');
const { successResponse, internalError, duplicateEntryError } = require('./responses');

async function handle_request(msg, callback) {

    switch (msg.type) {
        case "sendOrders":
            handleSendOrders(msg.req, callback);
            break;
        case "getAllRestaurants":
            handleGetAllRestaurants(msg.req, callback);
            break;
        case "getDishesbyResId":
            handleGetDishesbyResId(msg.req, callback);
            break;
        case "getOrdersByCustEmail":
            handleGetOrdersByCustEmail(msg.req, callback);
            break;
        case "getCustomerProfileByEmailId":
            handleGetCustomerProfileByEmailId(msg.req, callback);
            break;
        case "saveCustomerProfile":
            handleSaveCustomerProfile(msg.req, callback);
            break;
        case "updateCustomerProfile":
            handleUpdateCustomerProfile(msg.req, callback);
            break;
        case "updateFavourites":
            handleUpdateFavourites(msg.req, callback);
            break;
        case "getRestaurantsBasedonSearch":
            handleGetRestaurantsBasedonSearch(msg.req, callback);
            break;
    }
}

async function handleGetRestaurantsBasedonSearch(req, callback) {

    Restaurants.find({store_location : new RegExp(req)}, (error, results) => {
        if (error) {
            console.log("Fetching of all restaurants failed : " + error);
            callback(error, null);
        }
        else {
            console.log("Successfully retrieved all restaurants");
            callback(null, results);
        }
    });

}

async function handleGetAllRestaurants(req, callback) {

    Restaurants.find({}, (error, results) => {
        if (error) {
            console.log("Fetching of all restaurants failed : " + error);
            callback(error, null);
        }
        else {
            console.log("1 Dish Created");
            callback(null, results);
        }
    });

}

async function handleGetDishesbyResId(req, callback) {

    const order = req;
    console.log('Fetching for dishes of a restaurant....');
    Dishes.find({ restaurant_id: order.restaurantId }, (error, results) => {
        if (error) {
            console.log("Fetching of Dishes failed : " + error);
            callback(error, null);
        }
        else {
            console.log("Successfully fetched restaurants");
            callback(null, results);
        }
    });

}

async function handleSendOrders(req, callback) {

    console.log('Sending an order');

    const order = req;
    console.log('Saving Order....');

    const newOrder = new Orders({
        cust_email_id: order.custEmailId,
        restaurant_id: order.restaurantId,
        restaurant_name: order.restaurantName,
        dishes_ordered: order.dishes,
        delivery_address: order.deliveryAddress,
        order_timestamp: order.orderTimeStamp,
        payment_mode: order.paymentMode,
        order_price: order.totalPrice,
        status: 'RECEIVED',
        message : order.message ? order.message : null
    });
    newOrder.save((error, data) => {
        if (error) {
            console.log("Creation of Dish failed : " + error);
            callback(error, null);
        }
        else {
            console.log("1 Dish Created");
            callback(null, data);
        }
    });

}

async function handleGetOrdersByCustEmail(req, callback) {

    const order = req;

    console.log('Fetching for dishes of a restaurant....');
    Orders.find({ cust_email_id: order.emailId }, (error, results) => {
        if (error) {
            console.log("Fetching of Orders failed : " + error);
            callback(error, null);
        }
        else {
            console.log("Successfully fetched Orders");
            callback(null, results);
        }
    });
}

async function handleGetCustomerProfileByEmailId(req, callback) {

    console.log('Fetching for customer profile....');
    CustomerProfiles.find({ email_id: req.emailId }, (error, results) => {
        if (error) {
            console.log("Fetching of customer profile failed : " + error);
            callback(error, null);
        }
        else {
            console.log("Successfully fetched customer profile");
            callback(null, results);
        }
    });
}

async function handleSaveCustomerProfile(req, callback) {

    console.log("Inside saveCustomerProfile handle Request : " + JSON.stringify(req));
    const customer = req;
    const newCustomer = new CustomerProfiles({
        email_id: customer.emailId,
        phone: customer.phone,
        name: customer.name,
        nick_name: customer.nickName,
        DOB: customer.dob,
        address: customer.address,
        profile_img: customer.profileImg,
        favourites: ""
    });

    try {
        let existingCustomer = await CustomerProfiles.findOne({ email_id: customer.emailId });

        if (existingCustomer) {
            resp = duplicateEntryError();
        }
        else {
            await newCustomer.save();
            resp = successResponse({ "responseMessage": "Successfully inserted Customer Profile" });
        }
    }
    catch (err) {
        console.log(err);
        resp = internalError();
    }
    callback(null, resp);
}

async function handleUpdateCustomerProfile(req, callback) {

    console.log("Inside handleUpdateCustomerProfile handle Request : " + JSON.stringify(req));
    const customer = req;

    CustomerProfiles.updateOne({ email_id: customer.emailId }, {
        $set: {
            email_id: customer.emailId,
            phone: customer.phone,
            name: customer.name,
            nick_name: customer.nickName,
            DOB: customer.dob,
            address: customer.address,
            profile_img: customer.profilePictureUrl,
            favourites: customer.favourites
        }
    }, (err, res) => {
        if (err) throw err;
        if (err) {
            console.log("Updation of customer profile failed : " + err);
            callback(err, null);
        }
        else {
            console.log("1 customer profile Updated");
            callback(null, res);
        }

    });
}

async function handleUpdateFavourites(req, callback) {

    console.log("Inside handleUpdateFavourites handle Request : " + JSON.stringify(req));
    const customer = req;

    CustomerProfiles.updateOne({ email_id: customer.emailId }, {
        $set: {
            favourites: customer.updatedFavourites
        }
    }, (err, res) => {
        if (err) {
            console.log("Updation of customer profile favourites failed : " + err);
            callback(err, null);
        }
        else {
            console.log("1 customer profile favourites Updated");
            callback(null, res);
        }

    });
}

module.exports = {
    handle_request: handle_request
}