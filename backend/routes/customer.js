const express = require('express');
const router = express.Router();

const connection = require('../resources.js');
const Restaurants = require('../Models/Restaurants');
const Dishes = require('../Models/Dishes');
const Orders = require('../Models/Orders');
const CustomerProfiles = require('../Models/CustomerProfiles');

router.get('/mongo/getAllRestaurants', (req, res) => {
  Restaurants.find({}, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(results));
      }
  });
});

router.post('/mongo/getDishesbyResId', (req, res) => {
  console.log('Fetching for dishes of a restaurant....');
  Dishes.find({restaurant_id : req.body.restaurantId}, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(results));
      }
  });
});

router.post('/api/sendOrders', async (req, res) => {
  const custEmailId = req.body.custEmailId;
  const restaurantId = req.body.restaurantId;
  const dishes = req.body.dishes;
  const deliveryAddress = req.body.deliveryAddress;
  const orderTimeStamp = req.body.orderTimeStamp;
  const paymentMode = req.body.paymentMode;
  const totalPrice = req.body.totalPrice;

  console.log('Saving Order....');
  const insert_order_query = `INSERT INTO orders ( cust_email_id, restaurant_id, dishes_ordered, delivery_address, order_timestamp, payment_mode, order_price, status) values (?,?,?,?,?,?,?,'RECEIVED')`
  await connection.query(insert_order_query, [custEmailId, restaurantId, dishes, deliveryAddress, orderTimeStamp, paymentMode, totalPrice], async function (error, results) {
    if (error) {
      console.log("Not Successfull");
      res.send(JSON.stringify(error));
    }
    else {
      console.log('Successfully Received an Order');
      res.send(JSON.stringify(results));
    }
  });
});

router.post('/mongo/getOrdersByCustEmail', (req, res) => {
  console.log('Fetching for dishes of a restaurant....');
  Orders.find({cust_email_id : req.body.emailId}, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(results));
      }
  });
});

router.post('/mongo/getCustomerProfileByEmailId', (req, res) => {
  console.log('Fetching for dishes of a restaurant....');
  CustomerProfiles.find({email_id : req.body.emailId}, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          console.log('Successfully Retrieved the Profile for Customer');
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(results));
      }
  });
});

router.post('/api/saveCustomerProfile', async (req, res) => {
  const insert_default_user_profile_sql = `insert into customer_profiles (email_id, phone, name , nick_name, DOB , address, profile_img) values (?,?,?,?,?,?,?)`
  await connection.query(insert_default_user_profile_sql, [req.body.emailId,req.body.phone,req.body.name,req.body.nickName,req.body.dob,req.body.address,req.body.profileImg], async function (error, results) {
    if (error) {
      console.log("Not Successfull");
      res.send(JSON.stringify(error));
    }
    else {
      console.log('Successfully Saved the customer Profile');
      res.send('SUCCESS');
    }
  });
});

router.post('/api/updateCustomerProfile', async (req, res) => {
  const insert_default_user_profile_sql = `update customer_profiles set email_id = ?, phone = ?,  name = ? ,  nick_name = ?,  DOB = ? ,  address = ?,  profile_img = ? where email_id = ?`
  await connection.query(insert_default_user_profile_sql, [req.body.emailId,req.body.phone,req.body.name,req.body.nickName,req.body.dob,req.body.address,req.body.profilePictureUrl,req.body.emailId], async function (error, results) {
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

router.post('/mongo/getFavourites', (req, res) => {
  console.log('Fetching for Favourites of a customer....');
  CustomerProfiles.find({email_id : req.body.emailId}, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          console.log('Successfully Retrieved the Profile for Customer');
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(results.favourites));
      }
  });
});

router.post('/mongo/updateFavourites', (req, res) => {
  console.log('Updating Favourites of a customer....');
  CustomerProfiles.updateOne({email_id : req.body.emailId}, {
    $set: {
      favourites : req.body.updatedFavourites
    }
  }, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.send(false);
      }
      else {
          console.log('Successfully updated the favourites of the restaurant');
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.send(true);
      }
  });
});

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


router.post('/mongo/getRestaurantProfileByID', (req, res) => {
  console.log('Fetching for Restaurant Profile');
  Restaurants.find({restaurant_id : req.body.resId}, (error, results) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      else {
          console.log('Successfully Retrieved the Profile for Restaurant');
          res.writeHead(200, {
              'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(results));
      }
  });
});

module.exports = router;