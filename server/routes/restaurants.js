const express = require('express');
const router = express.Router();

const connection = require('../resources.js');

router.post('/api/createRestaurant', async (req, res) => {

  const restaurant = req.body;
  console.log('Adding a Restaurant', restaurant);
  const insert_restaurant_sql = `INSERT INTO restaurants (store_name, store_location, owner_email ) values (?,?,?)`
  await connection.query(insert_restaurant_sql, [restaurant.storeName, restaurant.storeLocation, restaurant.ownerEmail], async function (error) {
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

router.post('/api/saveRestaurantProfile', async (req, res) => {

  const restaurantProfile = req.body;
  console.log(restaurantProfile);
  const update_res = `UPDATE restaurants set store_name = ? ,  store_location = ? , description = ? , restaurant_img = ?, cuisine = ?, timings = ? , delivery_type = ?, phone = ?, street = ?, state = ?, country = ?, pincode = ? where owner_email= ?`
  await connection.query(update_res, [restaurantProfile.restaurantName, restaurantProfile.location, restaurantProfile.description, restaurantProfile.restaurantImgUrl, restaurantProfile.cuisine, restaurantProfile.timings, restaurantProfile.deliveryType, restaurantProfile.phone, restaurantProfile.street, restaurantProfile.state, restaurantProfile.country, restaurantProfile.pincode, restaurantProfile.emailId], async function (error, results) {
    if (error) {
      console.log(error);
      console.log('Restaurant Profile could not be updated');
      res.send("Update of Restuarant Profile failed");
    }
    else {
      console.log('Restaurant Profile updated');
      res.send("Successful");
    }
  });
});


router.post('/api/getRestaurantProfile', async (req, res) => {

  const emailId = req.body.emailId;
  const select_res_query = `SELECT * FROM restaurants where owner_email = ?`
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
      console.log(JSON.stringify(results[0]));
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

router.post('/api/getRestaurantProfileById', async (req, res) => {

  const restaurantId = req.body.restaurantId;
  const select_res_query = `SELECT * FROM restaurants where restaurant_id = ?`
  await connection.query(select_res_query, [restaurantId], async function (error, results) {
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

router.post('/api/saveDish', async (req, res) => {

  const insert_dish_query = `INSERT INTO dishes (restaurant_id,dish_name,dish_description,dish_price,dish_ingredients,dish_category,dish_img) select restaurant_id,?,?,?,?,?,? from restaurants where owner_email = ?`
  await connection.query(insert_dish_query, [req.body.dishName, req.body.dishDescription, req.body.dishPrice, req.body.dishIngredients, req.body.dishCategory, req.body.dishImgUrl, req.body.emailId], async function (error, results) {
    console.log(JSON.stringify(results));
    if (error) {
      console.log('Dish could not be added');
      res.send("insert of dish failed");
    }
    else {
      console.log('Dish added successfully');
      res.send("Successful");
    }
  });
});

router.post('/api/getDishes', async (req, res) => {

  const select_dishes_query = `select * from dishes where restaurant_id = (select restaurant_id from restaurants where owner_email=?)`
  await connection.query(select_dishes_query, [req.body.emailId], async function (error, results) {
    console.log(JSON.stringify(results));
    if (results.length === 0) {
      console.log('No Dishes Found for this restaurant  ');
      res.send(JSON.stringify(results));
    }

    else if (results.length > 0) {
      console.log('Successfully Retrieved the dishes for this restaurant');
      res.send(JSON.stringify(results));
    }

    else if (error) {
      console.log('Error Occured While Fetching the Data ' + error);
      res.writeHead(400, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }

    else {
      console.log('Unknown Fault Occured While Fetching the Dishes');
      res.writeHead(500, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
  });
});

router.post('/api/getOrdersByResId', async (req, res) => {

  const select_orders_query = `select * from orders where restaurant_id = (select restaurant_id from restaurants where owner_email=?)`
  await connection.query(select_orders_query, [req.body.emailId], async function (error, results) {
    console.log(JSON.stringify(results));
    if (results.length === 0) {
      console.log('No Orders Found for this restaurant  ');
      res.send(JSON.stringify(results));
    }

    else if (results.length > 0) {
      console.log('Successfully Retrieved the Orders for this restaurant');
      res.send(JSON.stringify(results));
    }

    else if (error) {
      console.log('Error Occured While Fetching the Data ' + error);
      res.writeHead(400, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }

    else {
      console.log('Unknown Fault Occured While Fetching the Orders');
      res.writeHead(500, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
  });
});

router.post('/api/updateOrder', async (req, res) => {

  const order = req.body;
  console.log(order);
  const update_order = `UPDATE orders set status = ? where order_id = ?`
  await connection.query(update_order, [order.status,order.order_id], async function (error, results) {
    if (error) {
      console.log(error);
      console.log('Order with Order Id '+ order.order_id + 'could not be updated');
      res.send("Update of order failed");
    }
    else {
      console.log('Order updated');
      res.send("Successful");
    }
  });
});

router.post('/api/updateDish', async (req, res) => {

  const dish = req.body;
  console.log(dish);
  const update_dish = `UPDATE dishes set dish_name = ?, dish_description = ? ,dish_price = ? , dish_ingredients = ? , dish_category = ? , dish_img= ? where dish_id = ?`
  await connection.query(update_dish, [dish.dishName,dish.dishDescription,dish.dishPrice,dish.dishIngredients,dish.dishCategory,dish.dishImgUrl,dish.dishId], async function (error, results) {
    if (error) {
      console.log(error);
      console.log('Diswh with Dish Id '+ dish.dishId + 'could not be updated');
      res.send("Update of Dish failed");
    }
    else {
      console.log('Dish updated');
      res.send("Successful");
    }
  });
});

module.exports = router;