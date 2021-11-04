const express = require('express');
const router = express.Router();

const connection = require('../resources.js');
const Users = require('../Models/UserModel');

router.post('/mongo/login', async (req, res) => {

  console.log('Fetching Details from DB');
  Users.findOne({ user_emailId: req.body.emailId, user_pwd: req.body.pwd }, (error, user) => {
    if (error) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        })
        res.end("Error Occured");
    }
    if (user) {
        res.cookie('cookie', user.user_name, { maxAge: 900000, httpOnly: false, path: '/' });
        //req.session.user = user;
        res.writeHead(200,user.restaurant_owner,{
          'Content-Type': 'text/plain'
        });
        res.end();
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