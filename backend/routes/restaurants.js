const express = require('express');
const router = express.Router();

const connection = require('../resources.js');
const Restaurants = require('../Models/Restaurants');
const Dishes = require('../Models/Dishes');
const Orders = require('../Models/Orders');

router.post('/mongo/createRestaurant', (req, res) => {
  console.log('Adding a Restaurant', restaurant);
  const restaurant = req.body;
  const newRestaurant = new Restaurants({
    store_name: restaurant.storeName,
    store_location: restaurant.storeLocation,
    owner_email: restaurant.ownerEmail,
    description: '',
    restaurant_img: '',
    timings: '',
    phone: '',
    street: '',
    state: '',
    country: '',
    pincode: ''
  });

  Restaurants.findOne({ owner_email: restaurant.ownerEmail }, (error, resultRestaurant) => {
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
    if (resultRestaurant) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end("Restaurant already exists");
    }
    else {
      newRestaurant.save((error, data) => {
        if (error) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          })
          res.end();
        }
        else {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          })
          res.end();
        }
      });
    }
  });
});

router.post('/mongo/saveRestaurantProfile', async (req, res) => {

  const restaurantProfile = req.body;
  Restaurants.updateOne({ owner_email: restaurantProfile.emailId }, {
    $set: {
      store_name: restaurantProfile.restaurantName,
      store_location: restaurantProfile.location,
      description: restaurantProfile.description,
      restaurant_img: restaurantProfile.restaurantImgUrl,
      cuisine: restaurantProfile.cuisine,
      timings: restaurantProfile.timings,
      delivery_type: restaurantProfile.deliveryType,
      dishes_type: restaurantProfile.dishesType,
      phone: restaurantProfile.phone,
      street: restaurantProfile.street,
      state: restaurantProfile.state,
      country: restaurantProfile.country,
      pincode: restaurantProfile.pincode,
      owner_email: restaurantProfile.emailId
    }
  }, (err, res) => {
    if (err) throw err;
    console.log("1 document updated");
    console.log(res);
  });
});

router.post('/mongo/getRestaurantProfile', (req, res) => {
  Restaurants.findOne({ owner_email: req.body.emailId }, (error, resultRestaurant) => {
    if (error) {
      console.log(error);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
    else if (resultRestaurant) {
      console.log('Successfully Retrieved the Restaurant profile');
      res.send(JSON.stringify(resultRestaurant));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
  });
});

router.post('/mongo/getRestaurantProfileById', (req, res) => {
  Restaurants.findOne({ _id: req.body.restaurantId }, (error, resultRestaurant) => {

    if (error) {
      console.log(error);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
    else if (resultRestaurant) {
      console.log('Successfully Retrieved the Restaurant profile');
      res.send(JSON.stringify(resultRestaurant));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
  });
});

router.post('/mongo/saveDish', async (req, res) => {

  console.log('Saving a Dish', restaurant);

  let restaurantId = '';
  Restaurants.findOne({ owner_email: req.body.emailId }, (error, resultRestaurant) => {
    if (error) {
      console.log("Error while fetching Restaurant : " + error);
    }
    else if (resultRestaurant) {
      console.log('Successfully Retrieved the Restaurant profile');
      restaurantId = resultRestaurant.id;
    }
    else {
      console.log("Not sure what happened");
    }
  });

  const newDish = new Dishes({
    restaurant_id: restaurantId,
    dish_name: req.body.dishName,
    dish_description: req.body.dishDescription,
    dish_price: req.body.dishPrice,
    dish_ingredients: req.body.dishIngredients,
    dish_category: req.body.dishCategory,
    dish_img: req.body.dishImgUrl,
  });
  newDish.save((error, data) => {
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end();
    }
  });

});

router.post('/mongo/getDishes', async (req, res) => {

  let restaurantId = '';
  Restaurants.findOne({ owner_email: req.body.emailId }, (error, resultRestaurant) => {
    if (error) {
      console.log("Error while fetching Restaurant : " + error);
    }
    else if (resultRestaurant) {
      console.log('Successfully Retrieved the Restaurant profile');
      restaurantId = resultRestaurant.id;
    }
    else {
      console.log("Not sure what happened");
    }
  });

  Dishes.find({ restaurant_id: restaurantId }, (error, results) => {
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

router.post('/mongo/getOrdersByResId', async (req, res) => {

  let restaurantId = '';
  Restaurants.findOne({ owner_email: req.body.emailId }, (error, resultRestaurant) => {
    if (error) {
      console.log("Error while fetching Restaurant : " + error);
    }
    else if (resultRestaurant) {
      console.log('Successfully Retrieved the Restaurant profile');
      restaurantId = resultRestaurant.id;
    }
    else {
      console.log("Not sure what happened");
    }
  });

  Orders.find({ restaurant_id: restaurantId }, (error, results) => {
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

router.post('/mongo/updateOrder', async (req, res) => {

  console.log('Updating the order');

  Orders.updateOne({ id: req.body.orderId }, {
    $set: {
      status: req.body.orderId
    }
  }, (err, res) => {
    if (err) throw err;
    console.log("1 Order updated");
    console.log(res);
  });
});

router.post('/mongo/updateDish', async (req, res) => {

  console.log('Updating the order');
  const dish = req.body;

  Dishes.updateOne({ id: dish.dishId }, {
    $set: {
      dish_name: dish.dishName,
      dish_description : dish.dishDescription,
      dish_price: dish.dishPrice,
      dish_ingredients : dish.dishIngredients,
      dish_category : dish.dishCategory,
      dish_img :  dish.dishImgUrl
    }
  }, (err, res) => {
    if (err) {
      console.log("Update of Dish failed : " + err);
      res.send("Update Failed");
    }
    else{
      console.log("1 Dish updated");
      res.send("Successful");
    }
  });
});

module.exports = router;