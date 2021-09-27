const express = require('express');
const router = express.Router();

const connection = require('../resources.js');

router.post('/api/createRestaurant', async (req, res) => {

  const restaurant = req.body;
  console.log('Adding a Restaurant', restaurant);
  const insert_restaurant_sql = `INSERT INTO restaurants (store_name, store_location, owner_name ) values (?,?,?)`
  await connection.query(insert_restaurant_sql, [restaurant.storeName, restaurant.storeLocation, restaurant.ownerName], async function (error, results) {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.writeHead(310, {
          'Content-Type': 'text/plain'
        });
        res.end(error.code);
      }
      else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.end(error.code);
      }
    }
    else {
      console.log('Restaurant Added')
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Restaurant Added Successfully');
    }
  });
});

router.post('/api/getRestaurantProfile', async (req, res) => {

  const emailId = req.body.emailId;
  const select_res_query = `SELECT * FROM restaurants where owner_name = (SELECT user_name from users where user_emailId = ?)`
  await connection.query(select_res_query, [emailId], async function (error, results) {
    console.log(JSON.stringify(results));
    if (results.length > 1) {
      console.log("Multiple Entries exists, Delete one Resturant user and profile entry");
      res.writeHead(301, {
        'Content-Type': 'text/plain'
      });
      res.send("Multiple Entries Exist, Please Contact Administrator");
    }

    else if (results.length === 0) {
      console.log("Restaurant Doesn't exist");
      res.writeHead(400, 'Restaurant Does not Exist', {
        'Content-Type': 'text/plain'
      });
      res.end();
    }

    else if (results.length === 1) {
      console.log('Successfully Retrieved the Restaurant profile');
      res.send(JSON.stringify(results[0]));
    }

    else if (error) {
      console.log('Error Occured While Fetching the Data ' + error);
      res.writeHead(400, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }

    else {
      console.log('Unknown Fault Occured While Fetching the Restaurant');
      res.writeHead(500, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
  });
});

module.exports = router;