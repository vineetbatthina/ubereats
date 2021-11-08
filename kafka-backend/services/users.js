const Users = require('../Models/UserModel');
const { successResponse, internalError, duplicateEntryError } = require('./responses');

async function handle_request(msg, callback) {

    switch (msg.type) {
        case "createUser":
            handleCreateUser(msg.req, callback);
            break;
        case "login":
            handleLogin(msg.req, callback);
            break
    }
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

async function handleLogin(req, callback) {

    console.log("Inside login handle Request : " + JSON.stringify(req));

    console.log('Fetching Details from DB');
    Users.findOne({ user_emailId: req.emailId, user_pwd: req.pwd }, (error, user) => {
        if (error) {
            console.log("Fetching User failed : " + error);
            callback(error, null);
        }
        else if (user) {
            console.log('Successfully Retrieved the User');
            callback(null, user);
        }
        else {
            console.log("Fetching User failed : ");
            callback(null, null);
        }
    });
}

async function handleCreateUser(req, callback) {

    console.log("Inside createUser handle Request : " + JSON.stringify(req));

    let resp = {};

    console.log("Message is : " + JSON.stringify(req));
    const user = req;
    const newUser = new Users({
        user_name: user.userName,
        user_emailId: user.userEmail,
        user_pwd: user.password,
        restaurant_owner: user.restaurantOwner
    });

    try {
        let existingUser = await Users.findOne({ user_emailId: user.userEmail });

        if (existingUser) {
            resp = duplicateEntryError();
        }
        else {
            await newUser.save();
            resp = successResponse({ "responseMessage": "Successfully inserted User" });
        }

    }
    catch (err) {
        console.log(err);
        resp = internalError();
    }
    return callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}