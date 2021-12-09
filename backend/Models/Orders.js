const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var orderSchema = new Schema({
    cust_email_id :{type: String , required : true},
    restaurant_id :{type: String , required : true},
    restaurant_name: {type: String , required : true},
    dishes_ordered :{type: String , required : true},
    delivery_address :{type: String , required : true},
    order_timestamp :{type: String , required : true},
    order_price :{type: String , required : true},
    payment_mode :{type: String , required : true},
    status :{type: String , required : true},
    message :{type: String },
},
{
    versionKey : false
});

const orderModel = mongoose.model('order',orderSchema);
module.exports = orderModel;