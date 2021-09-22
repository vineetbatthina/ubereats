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
  const insert_user_sql = `INSERT INTO users (user_name,user_emailId,user_pwd,restaurant_owner) values (?,?,?,?)`
  await connection.query(insert_user_sql,[user.userName , user.userEmail , user.password,user.restaurantOwner], async function (error,results){
    if(error){
      if(error.code==='ER_DUP_ENTRY')
      {
        res.writeHead(301,{
          'Content-Type' : 'text/plain'
        });
        res.end(error.code);
      }
      else{
        res.writeHead(400,{
          'Content-Type' : 'text/plain'
        });
        res.end(error.code);
      }
    }
    else{
      console.log('User Added')
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      });
      res.end('User Added Successfully');
    }
  });
});

app.post('/api/createRestaurant', async (req, res) => {

  const restaurant = req.body;
  console.log('Adding a Restaurant', restaurant);
  const insert_restaurant_sql = `INSERT INTO restaurants (store_name, store_location , owner_name ) values (?,?,?)`
  await connection.query(insert_restaurant_sql,[restaurant.storeName, restaurant.storeLocation , restaurant.ownerName], async function (error,results){
    if(error){
      if(error.code==='ER_DUP_ENTRY')
      {
        res.writeHead(310,{
          'Content-Type' : 'text/plain'
        });
        res.end(error.code);
      }
      else{
        res.writeHead(400,{
          'Content-Type' : 'text/plain'
        });
        res.end(error.code);
      }
    }
    else{
      console.log('Restaurant Added')
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      });
      res.end('Restaurant Added Successfully');
    }
  });
});

app.get('/', (req, res) => {
  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});