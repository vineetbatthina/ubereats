const express = require('express');
const router = express.Router();
const { upload } = require('../services/fileUploadAWS');
const Users = require('../Models/UserModel');
var kafka = require('../kafka/client');
const { secret } = require('../Utils/config');

const { USER_TOPIC } = require('../kafka/topics');
const { responseHandler, internalError } = require('./responses');

const jwt = require('jsonwebtoken');
const { auth } = require("../Utils/passport");
auth();

router.post('/api/imageUpload/:entity', upload.single('image'), function (req, res, next) {
  res.send({ imageUrl: req.file.location });
});

router.post('/kafka/createUser', function (req, res) {

  console.log("Request body is:" + req.body);
  const request = {
    req: req.body,
    type: "createUser"
  }

  console.log("API CALLEDDDDD");
  kafka.make_request(USER_TOPIC, request, function (err, result) {
    console.log('in result');
    console.log(result);
    if (err) {
      internalError(result);
    } else {
      responseHandler(res, result);
    }
  });
});

router.post('/kafka/login', function (req, res) {

  console.log("Request body is:" + req.body);
  const request = {
    req: req.body,
    type: "login"
  }

  console.log("Login API called....");
  kafka.make_request(USER_TOPIC, request, function (error, user) {
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      })
      res.end("Error Occured");
    }
    if (user) {
      const payload = { _id: user._id, username: user.user_name };
      const token = jwt.sign(payload, secret);

      res.writeHead(200, JSON.stringify({
        restaurantOwner: user.restaurant_owner,
        token : "JWT " + token
      }), {
        'Content-Type': 'text/plain'
      });
      res.end("Successfull");

    }
    else {
      res.writeHead(401, {
        'Content-Type': 'text/plain'
      })
      res.end("Invalid Credentials");
    }
  });
});

module.exports = router;