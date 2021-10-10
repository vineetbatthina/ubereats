var mysql = require('mysql');
var constants = require("./config.json");

var connection = mysql.createPool({
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
  });
  
  connection.getConnection((err) =>{
    if(err){
      throw 'Error Occured while creating pool' + err;
    }
    console.log("pool created");
  });

module.exports = connection;