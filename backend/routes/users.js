const express = require('express');
const router = express.Router();
const { upload } = require('../services/fileUploadAWS');
const Users = require('../Models/UserModel');
var kafka = require('../kafka/client');

const { USER_TOPIC } = require('../kafka/topics');
const { responseHandler, internalError } = require('./responses');

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
      res.cookie('cookie', user.user_name, { maxAge: 900000, httpOnly: false, path: '/' });
      res.writeHead(200, user.restaurant_owner, {
        'Content-Type': 'text/plain'
      });
      res.end("SUCCESSFULL LOGIN");
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