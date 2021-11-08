const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    user_name :{type: String , required : true},
    user_emailId :{type: String , required : true},
    user_pwd :{type: String , required : true},
    restaurant_owner :{type: String , required : true}
},
{
    versionKey : false
});

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;