const { mongoDB } = require('./config');
const mongoose = require('mongoose');

var options = {
  useNewUrlParser : true,
  useUnifiedTopology : true
};

var connection = mongoose.connect( mongoDB , options , (err,res) => {
  if(err){
    console.log("Error while connecting to Mongo DB : " + err);
  }
  else{
    console.log("Mongo Connected");
  }
})

module.exports = connection;