const express = require('express');
const router = express.Router();

const connection = require('../resources.js');
const { upload } = require('../services/fileUploadAWS');
const Users = require('../Models/UserModel');
const Restaurants = require('../Models/Restaurants');

router.post('/mongo/createUser', (req, res) => {
  const user = req.body;
  const newUser = new Users({
    user_name : user.userName,
    user_emailId : user.userEmail,
    user_pwd : user.password,
    restaurant_owner : user.restaurantOwner
  });

  Users.findOne({ user_emailId: user.userEmail }, (error, resultUser) => {
      if (error) {
          res.writeHead(500, {
              'Content-Type': 'text/plain'
          })
          res.end();
      }
      if (resultUser) {
          res.writeHead(400, {
              'Content-Type': 'text/plain'
          })
          res.end("Book ID already exists");
      }
      else {
        newUser.save((error, data) => {
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

router.post('/api/imageUpload/:entity', upload.single('image'), function (req, res, next) {
  res.send({ imageUrl: req.file.location });
});

router.get('/testMongo', (req, res) => {
  const newUser = new Users({
    user_id : '1',
    user_name : 'Vineet Batthina 2',
    user_emailId : 'abc@xyz.com',
    user_pwd : 'pwdEncrytpt',
    restaurant_owner : 'someone'
  });

  newUser.save((error,data) => {
    if(error){
      console.log(error);
    }
    else{
      console.log("Successfully inserted user");
    }
  })
});

router.get('/testId', (req, res) => {
  Restaurants.findOne({ _id: "6178724de35c675882d55cac"}, (error, resultRestaurant) => {

    if (resultRestaurant) {
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


module.exports = router;