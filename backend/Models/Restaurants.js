const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    store_name :{type: String , required : true},
    store_location :{type: String , required : true},
    owner_email :{type: String , required : true},
    description :{type: String },
    restaurant_img: {type: String },
    cuisine: {type: String },
    timings :{type: String },
    delivery_type : {type: String },
    dishes_type : {type: String },
    phone :{type: String },
    street :{type: String },
    state :{type: String },
    country :{type: String },
    pincode :{type: String },
},
{
    versionKey : false
});

const restaurantModel = mongoose.model('restaurant',restaurantSchema);
module.exports = restaurantModel;