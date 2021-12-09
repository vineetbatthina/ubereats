const { GraphQLObjectType, graphql, GraphQLSchema, GraphQLString, GraphQLBoolean, GraphQLList, VariablesAreInputTypesRule } = require("graphql");

const CustomerProfiles = require('../Models/CustomerProfiles');
const Dishes = require('../Models/Dishes');
const Orders = require('../Models/Orders');
const Restaurants = require('../Models/Restaurants');
const Users = require('../Models/UserModel');

const commonResponse = new GraphQLObjectType({
    name: 'commonResponse',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        user_emailId: {
            type: GraphQLString
        },
        user_name: {
            type: GraphQLString
        },
        user_pwd: {
            type: GraphQLString
        },
        restaurant_owner: {
            type: GraphQLString
        }
    })
})

const RestaurantType = new GraphQLObjectType({
    name: 'restaurant',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        store_name: {
            type: GraphQLString
        },
        store_location: {
            type: GraphQLString
        },
        owner_email: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        restaurant_img: {
            type: GraphQLString
        },
        timings: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        street: {
            type: GraphQLString
        },
        state: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        pincode: {
            type: GraphQLString
        },
        cuisine: {
            type: GraphQLString
        },
        delivery_type: {
            type: GraphQLString
        },
        dishes_type: {
            type: GraphQLString
        }
    })
})

const DishType = new GraphQLObjectType({
    name: 'ItemType',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        restaurant_id: {
            type: GraphQLString
        },
        dish_name: {
            type: GraphQLString
        },
        dish_description: {
            type: GraphQLString
        },
        dish_price: {
            type: GraphQLString
        },
        dish_ingredients: {
            type: GraphQLString
        },
        dish_category: {
            type: GraphQLString
        },
        dish_img: {
            type: GraphQLString
        },
    })
})

const OrderType = new GraphQLObjectType({
    name: 'DishType',
    fields:{
        _id:{
            type: GraphQLString
        },
        cust_email_id:{
            type: GraphQLString
        }, 
        restaurant_id:{
            type: GraphQLString
        }, 
        restaurant_name:{
            type: GraphQLString
        }, 
        dishes_ordered:{
            type: GraphQLString
        }, 
        delivery_address:{
            type: GraphQLString
        }, 
        order_timestamp:{
            type: GraphQLString
        }, 
        order_price:{
            type: GraphQLString
        }, 
        payment_mode:{
            type: GraphQLString
        }, 
        status:{
            type: GraphQLString
        }, 
        message:{
            type: GraphQLString
        }
    }
    
})

const CustomerType = new GraphQLObjectType({
    name: 'CustomerType',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        email_id: {
            type: GraphQLString
        },
        name:{
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        nick_name: {
            type: GraphQLString
        },
        DOB: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        favourites: {
            type: GraphQLString
        },
        profile_img: {
            type: GraphQLString
        },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: UserType,
            args: {
                user_emailId: {
                    type: GraphQLString
                },
                user_pwd: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('Params Passed:', args);

                return new Promise((resolve, reject) => {
                    Users.findOne({ user_emailId: args.user_emailId, user_pwd: args.user_pwd }, (error, user) => {
                        if (error) {
                            console.log("Fetching User failed : " + error);
                            reject("error")
                        }
                        else if (user) {
                            console.log('Successfully Retrieved the User');
                            resolve(user);
                        }
                        else {
                            console.log("Fetching User failed : " + error);
                            reject("error")
                        }
                    });
                })
            }
        },
        restaurantProfile: {
            type: RestaurantType,
            args: {
                owner_email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('Params Passed:', args);
                return new Promise((resolve, reject) => {
                    Restaurants.findOne({ owner_email: args.owner_email }, (error, resultRestaurant) => {

                        if (resultRestaurant) {
                            console.log('Successfully Retrieved the restaurant Profile',resultRestaurant);
                            resolve(resultRestaurant);
                        }
                        else {
                            console.log("Fetching Restaurant failed : " + error);
                            reject("error")
                        }
                    });
                })
            }
        },
        restaurantProfileById : {
            type: RestaurantType,
            args: {
                _id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('Params Passed:', args);
                return new Promise((resolve, reject) => {
                    Restaurants.findOne({ _id: args._id }, (error, resultRestaurant) => {

                        if (resultRestaurant) {
                            console.log('Successfully Retrieved the restaurant Profile', resultRestaurant);
                            resolve(resultRestaurant);
                        }
                        else {
                            console.log("Fetching Restaurant failed : " + error);
                            reject("error")
                        }
                    });
                })
            }
        },
        getRestaurantDishes: {
            type: new GraphQLList(DishType),
            args: {
                owner_email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {

                console.log('Params Passed:', args);

                return new Promise((resolve, reject) => {
                    let restaurantId = '';
                    Restaurants.findOne({ owner_email: args.owner_email }, (error, resultRestaurant) => {
                        if (resultRestaurant) {
                            restaurantId = resultRestaurant.id;
                            Dishes.find({ restaurant_id: restaurantId }, (error, results) => {
                                if (error) {
                                    console.log("Fetching Dishes failed : " + error);
                                    reject("ERROR");
                                }
                                else {
                                    console.log("Dishes Successfully fetched");
                                    resolve(results);
                                }
                            });
                        }
                        else {
                            console.log("Fetching of Restaurant Failed ");
                            let error = "Couldn't find the restaurant"
                            reject("ERROR");
                        }
                    })
                })
            }
        },
        getAllRestaurants:{
            type: GraphQLList(RestaurantType),
            resolve(parent,args){
                console.log("Fetching all restaurants........");

                return new Promise((resolve, reject)=>{
                    Restaurants.find({}, (error, results) => {
                        if (error) {
                            console.log("Fetching of all restaurants failed : " + error);
                            reject("ERROR");
                        }
                        else {
                            console.log("All restaurants fetched");
                            resolve(results);
                        }
                    });
                })
            }
        },
        getCustomerProfile:{
            type: CustomerType,
            args:{
                email_id:{
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                console.log("Fetching all restaurants........");

                return new Promise((resolve, reject)=>{
                    console.log("Received Email is: "+args.email_id)
                    CustomerProfiles.findOne({ email_id: args.email_id }, (error, results) => {
                        if (error) {
                            console.log("Fetching of customer profile failed : " + error);
                            reject(error);
                        }
                        else {
                            console.log("Successfully fetched customer profile");
                            console.log(results);
                            resolve(results);
                        }
                    });
                })
            }
        },
        getOrdersByRestaurantId :{
            type: GraphQLList(OrderType),
            args:{
                email_id:{
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                console.log("args received are : " , args);

                return new Promise((resolve,reject) =>{
                    console.log('Getting the Orders');
                    console.log(args.email_id);
                    Restaurants.findOne({ owner_email: args.email_id },(err,result)=>{
                        if (result) {
                            console.log('Successfully Retrieved the Restaurant profile');
                            Orders.find({ restaurant_id: result.id }, (error, results) => {
                                if (error) {
                                    console.log("Fetching orders failed : " + error);
                                }
                                else {
                                    console.log("Orders Successfully fetched");
                                    resolve(results);
                                }
                            });
                        }
                        else {
                            console.log(" Error ", err);
                            reject("ERROR");
                        }
                    })
                })
            }
        },
        getOrdersForCustomer :{
            type: GraphQLList(OrderType),
            args:{
                email_id:{
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                console.log("args received are : " , args);

                return new Promise((resolve,reject) =>{
                    console.log('Getting the Orders');
                    console.log(args.email_id);
                    Orders.find({ cust_email_id: args.email_id }, (error, results) => {
                        console.log("Results are ",results);
                        if (error) {
                            console.log("Fetching orders failed : " + error);
                            resolve("ERROR");
                        }
                        else {
                            console.log("Orders Successfully fetched");
                            resolve(results);
                        }
                    });
                })
            }
        }

    }
})

const RootMutation = new GraphQLObjectType({
    name: 'rootMutation',
    fields: {
        updateRestaurantProfile: {
            type: commonResponse,
            args: {
                _id: {
                    type: GraphQLString
                },
                store_name: {
                    type: GraphQLString
                },
                store_location: {
                    type: GraphQLString
                },
                owner_email: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                restaurant_img: {
                    type: GraphQLString
                },
                timings: {
                    type: GraphQLString
                },
                phone: {
                    type: GraphQLString
                },
                street: {
                    type: GraphQLString
                },
                state: {
                    type: GraphQLString
                },
                country: {
                    type: GraphQLString
                },
                pincode: {
                    type: GraphQLString
                },
                cuisine: {
                    type: GraphQLString
                },
                delivery_type: {
                    type: GraphQLString
                },
                dishes_type: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("Update profile called with args : " + args);

                return new Promise((resolve, reject) => {
                    Restaurants.updateOne({ owner_email: args.owner_email }, {
                        $set: {
                            store_name: args.store_name,
                            store_location: args.store_location,
                            description: args.description,
                            restaurant_img: args.restaurant_img,
                            cuisine: args.cuisine,
                            timings: args.timings,
                            delivery_type: args.delivery_type,
                            dishes_type: args.dishes_type,
                            phone: args.phone,
                            street: args.street,
                            state: args.state,
                            country: args.country,
                            pincode: args.pincode,
                            owner_email: args.owner_email
                        }
                    }, (err, res) => {
                        if (err) {
                            console.log('Failed to update the Restaurant Profile');
                            reject(err);
                        }
                        else {
                            console.log('Successfully updated the restaurant Profile');
                            resolve(res);
                        }
                    });
                })
            }
        },
        createUser: {
            type: commonResponse,
            args: {
                user_name: {
                    type: GraphQLString
                },
                user_emailId: {
                    type: GraphQLString
                },
                user_pwd: {
                    type: GraphQLString
                },
                restaurant_owner: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('Params Passed:', args);

                return new Promise((resolve, reject) => {

                    const newUser = new Users({
                        user_name: args.user_name,
                        user_emailId: args.user_emailId,
                        user_pwd: args.user_pwd,
                        restaurant_owner: args.restaurant_owner
                    });

                    newUser.save(function (err) {
                        if (err) {
                            console.log(err)
                            result = {
                                success: false,
                                duplicateUser: true
                            }
                            reject(result)
                        }
                        else {
                            console.log("User saved successfully", newUser);
                            result = {
                                success: true,
                                duplicateUser: false
                            }
                            resolve(result)
                        }
                    });
                })
            }
        },
        createRestaurantProfile: {
            type: commonResponse,
            args: {
                store_name: {
                    type: GraphQLString
                },
                store_location: {
                    type: GraphQLString
                },
                owner_email: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('Params Passed:', args);

                return new Promise((resolve, reject) => {

                    const newRestaurant = new Restaurants({
                        store_name: args.store_name,
                        store_location: args.store_location,
                        owner_email: args.owner_email,
                        description: '',
                        restaurant_img: '',
                        timings: '',
                        phone: '',
                        street: '',
                        state: '',
                        country: '',
                        pincode: ''
                    });

                    newRestaurant.save(function (err) {
                        if (err) {
                            console.log(err)
                            result = {
                                success: false,
                                duplicateUser: true
                            }
                            reject(result)
                        }
                        else {
                            console.log("User saved successfully", newRestaurant);
                            result = {
                                success: true,
                                duplicateUser: false
                            }
                            resolve(result)
                        }
                    });
                })
            }
        },
        saveRestaurantDish: {
            type: commonResponse,
            args: {
                owner_email: {
                    type: GraphQLString
                },
                dish_name: {
                    type: GraphQLString
                },
                dish_description: {
                    type: GraphQLString
                },
                dish_price: {
                    type: GraphQLString
                },
                dish_ingredients: {
                    type: GraphQLString
                },
                dish_category: {
                    type: GraphQLString
                },
                dish_img: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('Params Passed:', args);

                return new Promise((resolve, reject) => {

                    console.log('Saving a Dish');

                    let restaurantId = '';
                    Restaurants.findOne({ owner_email: args.owner_email }, (err, response) => {
                        if (response) {
                            restaurantId = response.id;
                            console.log('Successfully Retrieved the Restaurant profile');
                            const newDish = new Dishes({
                                restaurant_id: restaurantId,
                                dish_name: args.dish_name,
                                dish_description: args.dish_description,
                                dish_price: args.dish_price,
                                dish_ingredients: args.dish_ingredients,
                                dish_category: args.dish_category,
                                dish_img: args.dish_img
                            });
                            newDish.save((error, data) => {
                                if (error) {
                                    console.log("Creation of Dish failed : " + error);
                                    result = {
                                        success: false
                                    }
                                    reject(result)
                                }
                                else {
                                    console.log("1 Dish Created");
                                    result = {
                                        success: true
                                    }
                                    resolve(result)
                                }
                            });
                        }
                        else {
                            console.log("Fetching of Restaurant Failed ");
                            result = {
                                success: false
                            }
                            reject(result)
                        }
                    })

                })
            }
        },
        placeOrder: {
            type: commonResponse,
            args :{
                cust_email_id:{
                    type: GraphQLString
                }, 
                restaurant_id:{
                    type: GraphQLString
                }, 
                restaurant_name:{
                    type: GraphQLString
                }, 
                dishes_ordered:{
                    type: GraphQLString
                }, 
                delivery_address:{
                    type: GraphQLString
                }, 
                order_timestamp:{
                    type: GraphQLString
                }, 
                order_price:{
                    type: GraphQLString
                }, 
                payment_mode:{
                    type: GraphQLString
                }, 
                status:{
                    type: GraphQLString
                }, 
                message:{
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                console.log("args received: " , args);

                return new Promise((resolve,reject)=>{
                    const newOrder = new Orders({
                        cust_email_id: args.cust_email_id,
                        restaurant_id: args.restaurant_id,
                        restaurant_name: args.restaurant_name,
                        dishes_ordered: args.dishes_ordered,
                        delivery_address: args.delivery_address,
                        order_timestamp: args.order_timestamp,
                        payment_mode: args.payment_mode,
                        order_price: args.order_price,
                        status: 'RECEIVED',
                        message : args.message ? args.message : null
                    });
                    newOrder.save((error, data) => {
                        if (error) {
                            console.log("Creation of Dish failed : " + error);
                            result = {
                                success: false
                            }
                            reject(result)
                        }
                        else {
                            console.log("1 Dish Created");
                            result = {
                                success: true
                            }
                            resolve(result)
                        }
                    });
                })
            }
        },
        updateOrderStatus:{
            type: commonResponse,
            args :{
                _id:{
                    type: GraphQLString
                }, 
                status:{
                    type: GraphQLString
                }, 
            },
            resolve(parent,args){
                console.log("args received: " , args);

                return new Promise((resolve,reject)=>{
                    Orders.updateOne({ _id: args._id }, {
                        $set: {
                            status: args.status
                        }
                    }, (err, res) => {
                        if (err) throw err;
                        if (err) {
                            console.log("Updation of Order failed : " + err);
                            result = {
                                success: false
                            }
                            reject(result)
                        }
                        else {
                            console.log("1 Order Updated");
                            result = {
                                success: true
                            }
                            resolve(result)
                        }
                
                    });
                })
            }
        }
    }
}
)

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})