const express = require('express');
const app = express(),
  bodyParser = require("body-parser");
Cors = require("cors"),
  port = 3080;
var constants = require("./config.json");

var mysql = require('mysql');
const users = ['Vineet'];

app.use(bodyParser.json());
app.use(Cors());

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

app.get('/api/users',async (req, res) => {
  await connection.query('SELECT * FROM users', async function (error,results){
    if(error){
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      });
      res.end(error.code);
    }
    else{
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      });
      res.end(JSON.stringify(results));
    }
  });
});

app.post('/api/createUser', async (req, res) => {

  const user = req.body;
  console.log('Adding a User', user);
  const insert_user_sql = `INSERT INTO users (user_name,user_emailId,user_pwd) values (?,?,?)`
  await connection.query(insert_user_sql,[user.userName , user.userEmail , user.password], async function (error,results){
    if(error){
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      });
      res.end(error.code);
    }
    else{
      res.send('User Added');
    }
  });
});

app.post('/api/createRestaurant', async (req, res) => {

  const restaurant = req.body;
  console.log('Adding a Restaurant', restaurant);
  const insert_restaurant_sql = `INSERT INTO restaurants (store_name, store_location , full_name, emailId, pwd ) values (?,?,?,?,?)`
  await connection.query(insert_restaurant_sql,[restaurant.storeName, restaurant.storeLocation , restaurant.fullName, restaurant.emailId, restaurant.pwd], async function (error,results){
    if(error){
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      });
      res.end(error.code);
    }
    else{
      res.send('Restaurant Added');
    }
  });
});

app.get('/', (req, res) => {
  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});