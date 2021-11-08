const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var dishSchema = new Schema({
    restaurant_id :{type: String , required : true},
    dish_name :{type: String , required : true},
    dish_description :{type: String , required : true},
    dish_price :{type: String , required : true},
    dish_ingredients :{type: String , required : true},
    dish_category :{type: String , required : true},
    dish_img :{type: String , required : true},
},
{
    versionKey : false
});

const dishModel = mongoose.model('dishe',dishSchema);
module.exports = dishModel;