const express = require('express');
const router = express.Router();

const connection = require('../resources.js');
const Restaurants = require('../Models/Restaurants');
const Dishes = require('../Models/Dishes');
const Orders = require('../Models/Orders');
const CustomerProfiles = require('../Models/CustomerProfiles');

const { CUSTOMER_TOPIC } = require('../kafka/topics');
var kafka = require('../kafka/client');

router.get('/kafka/getAllRestaurants', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    type: "getAllRestaurants"
  }

  console.log("getAllRestaurants API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log("Successfully Retrieved all the restaurants");
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/getDishesbyResId', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "getDishesbyResId"
  }

  console.log("getDishesbyResId API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log('Successfully Fetched Dishes of restaurant');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/sendOrders', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "sendOrders"
  }

  console.log("sendOrders API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log('Successfully Received an Order');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/getOrdersByCustEmail', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "getOrdersByCustEmail"
  }

  console.log("getOrdersByCustEmail API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log('Successfully Fetched Orders of Customer');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/getCustomerProfileByEmailId', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "getCustomerProfileByEmailId"
  }

  console.log("getCustomerProfileByEmailId API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log('Successfully Fetched Profile of Customer');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/saveCustomerProfile', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "saveCustomerProfile"
  }

  console.log("saveCustomerProfile API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    if (console.error()) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log('Successfully Saved the customer Profile');
      res.send('SUCCESS');
    }
  });
});

router.post('/kafka/updateCustomerProfile', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "updateCustomerProfile"
  }

  console.log("updateCustomerProfile API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (error, respose) {
    if (error) {
      console.log("Not Successfull");
      res.send(JSON.stringify(error));
    }
    else {
      console.log('Successfully Updated the customer Profile');
      res.send('SUCCESS');
    }
  });
});

//TBC
router.post('/api/getRestaurantsBasedonSearch', async (req, res) => {
  const searchString = req.body.searchString.concat('%');
  const select_restaurants_based_on_search = `SELECT DISTINCT r.restaurant_id,r.store_name,r.store_location,r.owner_email,r.description,r.timings,r.phone,r.street,r.state,r.country,r.pincode,r.restaurant_img,r.delivery_type,r.dishes_type FROM restaurants r LEFT OUTER JOIN dishes m ON m.restaurant_id = r.restaurant_id WHERE (m.dish_name LIKE ? OR m.dish_description LIKE ? OR r.store_name LIKE ? OR r.store_location LIKE ? OR r.cuisine LIKE ?);`
  await connection.query(select_restaurants_based_on_search, [searchString,searchString,searchString,searchString,searchString], async function (error, results) {
    if (error) {
      console.log("Not Successfull");
      res.send(JSON.stringify(error));
    }
    else {
      console.log('Successfully Retrieved the restaurants based on search string the customer profile');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/getFavourites', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "getCustomerProfileByEmailId"
  }

  console.log("getCustomerProfileByEmailId API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (error, results) {
    if (error) {
      res.writeHead(500, {
          'Content-Type': 'text/plain'
      })
      res.end();
  }
  else {
      console.log('Successfully Retrieved the Favourites for Customer');
      res.writeHead(200, {
          'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results[0].favourites));
  }
  });
});

router.post('/kafka/updateFavourites', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "updateFavourites"
  }

  console.log("updateFavourites API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (error, results) {
    if (error) {
      console.log("Not Successfull");
      res.send(false);
    }
    else {
      console.log('Successfully Updated the customer favourites');
      res.send(true);
    }
  });
});

//TBC
router.post('/api/getRestaurantsBasedonIds', async (req, res)=>{

  const select_restaurants = `SELECT * FROM restaurants where restaurant_id IN ?`;
  await connection.query(select_restaurants, [req.body.searchString], async function (error, results) {
    if (error) {
      console.log("Not Successfull");
      res.send(JSON.stringify(error));
    }
    else {
      console.log('Successfully Retrieved the restaurants based on search string the customer profile');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/kafka/getCustomerProfileByEmailId', async (req, res) => {
  
  console.log("Request body is:" + req.body);

  const request = {
    req: req.body,
    type: "getCustomerProfileByEmailId"
  }

  console.log("getCustomerProfileByEmailId API Called.....");
  kafka.make_request(CUSTOMER_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      console.log("Not Successfull");
      res.send(JSON.stringify(err));
    }
    else {
      console.log('Successfully Fetched Profile of Customer');
      res.send(JSON.stringify(results));
    }
  });
});

module.exports = router;