const Restaurants = require('../Models/Restaurants');
const Dishes = require('../Models/Dishes');
const Orders = require('../Models/Orders');
const { successResponse, internalError, duplicateEntryError } = require('./responses');

async function handle_request(msg, callback) {

    switch (msg.type) {
        case "createRestaurant":
            handleCreateRestaurant(msg.req, callback);
            break;
        case "updateDish":
            handleUpdateDish(msg.req, callback);
            break;
        case "saveDish":
            handleSaveDish(msg.req, callback);
            break;
        case "updateOrder":
            handleUpdateOrder(msg.req, callback);
            break;
        case "getOrdersByResId":
            handleGetOrdersByResId(msg.req, callback);
            break;
        case "getDishes":
            handleGetDishes(msg.req, callback);
            break;
        case "getRestaurantProfileById":
            handleGetRestaurantProfileById(msg.req, callback);
            break;
        case "getRestaurantProfile":
            handleGetRestaurantProfile(msg.req, callback);
            break;
        case "saveRestaurantProfile":
            handleSaveRestaurantProfile(msg.req, callback);
            break;
    }
}

async function handleSaveRestaurantProfile(req, callback) {

    const restaurantProfile = req;
    Restaurants.updateOne({ owner_email: restaurantProfile.emailId }, {
        $set: {
            store_name: restaurantProfile.restaurantName,
            store_location: restaurantProfile.location,
            description: restaurantProfile.description,
            restaurant_img: restaurantProfile.restaurantImgUrl,
            cuisine: restaurantProfile.cuisine,
            timings: restaurantProfile.timings,
            delivery_type: restaurantProfile.deliveryType,
            dishes_type: restaurantProfile.dishesType,
            phone: restaurantProfile.phone,
            street: restaurantProfile.street,
            state: restaurantProfile.state,
            country: restaurantProfile.country,
            pincode: restaurantProfile.pincode,
            owner_email: restaurantProfile.emailId
        }
    }, (err, res) => {
        if (err) {
            console.log("Fetching Dishes failed : " + error);
            callback(error, null);
        }
        else {
            console.log('Successfully updated the Restaurant profile');
            callback(null, "Success");
        }
    });
}

async function handleGetRestaurantProfile(req, callback) {

    Restaurants.findOne({ owner_email: req.emailId }, (error, resultRestaurant) => {

        if (resultRestaurant) {
            console.log('Successfully Retrieved the Restaurant profile');
            callback(null, resultRestaurant);
        }
        else {
            console.log("Fetching Dishes failed : " + error);
            callback(error, null);
        }
    });
}

async function handleGetRestaurantProfileById(req, callback) {

    Restaurants.findOne({ _id: req.restaurantId }, (error, resultRestaurant) => {

        if (resultRestaurant) {
            console.log('Successfully Retrieved the Restaurant profile');
            callback(null, resultRestaurant);
        }
        else {
            console.log("Fetching Dishes failed : " + error);
            callback(error, null);
        }
    });
}

async function handleGetDishes(req, callback) {

    console.log('Fetching dishes of restaurant');

    let restaurantId = '';
    let existingRestaurant = await Restaurants.findOne({ owner_email: req.emailId })
    if (existingRestaurant) {
        console.log('Successfully Retrieved the Restaurant profile');
        restaurantId = existingRestaurant.id;
    }
    else {
        console.log("Fetching of Restaurant Failed ");
        let error = "Couldn't find the restaurant"
        callback(error, null);
    }

    Dishes.find({ restaurant_id: restaurantId }, (error, results) => {
        if (error) {
            console.log("Fetching Dishes failed : " + error);
            callback(error, null);
        }
        else {
            console.log("Dishes Successfully fetched");
            callback(null, results);
        }
    });

}

async function handleGetOrdersByResId(req, callback) {

    console.log('Saving a Dish');

    let restaurantId = '';
    let existingRestaurant = await Restaurants.findOne({ owner_email: req.emailId })
    if (existingRestaurant) {
        console.log('Successfully Retrieved the Restaurant profile');
        restaurantId = existingRestaurant.id;
    }
    else {
        console.log("Fetching of Restaurant Failed ");
        let error = "Couldn't find the restaurant"
        callback(error, null);
    }

    Orders.find({ restaurant_id: restaurantId }, (error, results) => {
        if (error) {
            console.log("Fetchinf orders failed : " + error);
            callback(error, null);
        }
        else {
            console.log("Orders Successfully fetched");
            callback(null, results);
        }
    });

}

async function handleUpdateOrder(req, callback) {

    const order = req;

    console.log('Updating the order');

    Orders.updateOne({ _id: order._id }, {
        $set: {
            status: order.status
        }
    }, (err, res) => {
        if (err) throw err;
        if (err) {
            console.log("Updation of Order failed : " + err);
            callback(err, null);
        }
        else {
            console.log("1 Order Updated");
            callback(null, res);
        }

    });

}


async function handleSaveDish(req, callback) {

    console.log('Saving a Dish');

    let restaurantId = '';
    let existingRestaurant = await Restaurants.findOne({ owner_email: req.emailId })
    if (existingRestaurant) {
        console.log('Successfully Retrieved the Restaurant profile');
        restaurantId = existingRestaurant.id;
    }
    else {
        console.log("Fetching of Restaurant Failed ");
        let error = "Couldn't find the restaurant"
        callback(error, null);
    }

    const newDish = new Dishes({
        restaurant_id: restaurantId,
        dish_name: req.dishName,
        dish_description: req.dishDescription,
        dish_price: req.dishPrice,
        dish_ingredients: req.dishIngredients,
        dish_category: req.dishCategory,
        dish_img: req.dishImgUrl
    });
    newDish.save((error, data) => {
        if (error) {
            console.log("Creation of Dish failed : " + error);
            callback(error, null);
        }
        else {
            console.log("1 Dish Created");
            callback(null, "Successfull");
        }
    });

}

async function handleUpdateDish(req, callback) {

    const dish = req;

    Dishes.updateOne({ id: dish.dishId }, {
        $set: {
            dish_name: dish.dishName,
            dish_description: dish.dishDescription,
            dish_price: dish.dishPrice,
            dish_ingredients: dish.dishIngredients,
            dish_category: dish.dishCategory,
            dish_img: dish.dishImgUrl
        }
    }, (err, res) => {
        if (err) {
            console.log("Update of Dish failed : " + err);
            callback(err, null);
        }
        else {
            console.log("1 Dish updated");
            callback(null, "Successfull");
        }
    });

}

async function handleCreateRestaurant(req, callback) {

    let resp = {};
    console.log("Inside createRestaurant handle Request : " + JSON.stringify(req));
    const restaurant = req;
    const newRestaurant = new Restaurants({
        store_name: restaurant.storeName,
        store_location: restaurant.storeLocation,
        owner_email: restaurant.ownerEmail,
        description: '',
        restaurant_img: '',
        timings: '',
        phone: '',
        street: '',
        state: '',
        country: '',
        pincode: ''
    });

    try {
        let existingRestaurant = await Restaurants.findOne({ owner_email: restaurant.ownerEmail });

        if (existingRestaurant) {
            resp = duplicateEntryError();
        }
        else {
            await newRestaurant.save();
            resp = successResponse({ "responseMessage": "Successfully inserted Restaurant" });
        }
    }
    catch (err) {
        console.log(err);
        resp = internalError();
    }
    callback(null, resp);

}

module.exports = {
    handle_request: handle_request
}