const express = require('express');
const router = express.Router();

const connection = require('../resources.js');
const Restaurants = require('../Models/Restaurants');
const Dishes = require('../Models/Dishes');
const Orders = require('../Models/Orders');

const { RESTAURANT_TOPIC } = require('../kafka/topics');
var kafka = require('../kafka/client');
const { responseHandler, internalError } = require('./responses');

router.post('/kafka/saveRestaurantProfile', function (req, res) {

  console.log('updating the profile of restaurant');
  const request = {
    req: req.body,
    type: "saveRestaurantProfile"
  }

  console.log("saveRestaurantProfile API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      console.log(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end(String.toString(err));
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end("Success");
    }
  });
});

router.post('/kafka/getRestaurantProfile', function (req, res) {

  console.log('fetching the profile of restaurant');
  const request = {
    req: req.body,
    type: "getRestaurantProfile"
  }

  console.log("getRestaurantProfile API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      console.log(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end(String.toString(err));
    }
    else if (result) {
      console.log('Successfully Retrieved the Restaurant profile');
      res.send(JSON.stringify(result));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end("Internal Error");
    }
  });
});

router.post('/kafka/getRestaurantProfileById', function (req, res) {

  console.log('fetching the profile of restaurant');
  const request = {
    req: req.body,
    type: "getRestaurantProfileById"
  }

  console.log("getRestaurantProfileById API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      console.log(err);
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end(String.toString(err));
    }
    else if (result) {
      console.log('Successfully Retrieved the Restaurant profile');
      res.send(JSON.stringify(result));
    }
    else {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end("Internal Error");
    }
  });
});

router.post('/kafka/getDishes', function (req, res) {

  console.log('fetching the dishes of restaurant');
  const request = {
    req: req.body,
    type: "getDishes"
  }

  console.log("getDishes API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end("Error fetching Dishes");
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  });
});

router.post('/kafka/getOrdersByResId', function (req, res) {

  console.log('Updating the order');
  const request = {
    req: req.body,
    type: "getOrdersByResId"
  }

  console.log("getOrdersByResId API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(results));
    }
  });
});

router.post('/kafka/updateOrder', function (req, res) {

  console.log('Updating the order');
  const request = {
    req: req.body,
    type: "updateOrder"
  }

  console.log("updateOrder API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      console.log("Update of Order failed : " + err);
      res.send("Update Failed");
    } else {
      console.log("1 Order updated");
      res.send("Successful");
    }
  });
});

router.post('/kafka/saveDish', function (req, res) {

  console.log("Request body is:" + req.body);
  const request = {
    req: req.body,
    type: "saveDish"
  }

  console.log("saveDish API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      console.log("Saving a Dish failed : " + err);
      res.send("Save Failed");
    } else {
      console.log("1 Dish Created");
      res.send("Successful");
    }
  });
});

router.post('/kafka/updateDish', function (req, res) {

  console.log("Request body is:" + req.body);
  const request = {
    req: req.body,
    type: "updateDish"
  }

  console.log("updateDish API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      console.log("Update of Dish failed : " + err);
      res.send("Update Failed");
    } else {
      console.log("1 Dish updated");
      res.send("Successful");
    }
  });
});

router.post('/kafka/createRestaurant', function (req, res) {

  console.log("Request body is:" + req.body);
  const request = {
    req: req.body,
    type: "createRestaurant"
  }

  console.log("createRestaurant API Called.....");
  kafka.make_request(RESTAURANT_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      internalError(res);
    } else {
      responseHandler(res, result);
    }
  });
});

module.exports = router;