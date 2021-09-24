const express = require('express');
const router = express.Router();

const connection = require('../resources.js');

router.post('/api/login', async (req, res) => {

  const credentials = req.body;
  console.log('Fetching Details from DB');
  const fetch_user = `SELECT * FROM users where user_emailId = ?`
  await connection.query(fetch_user, [credentials.emailId], async function (error, results) {
    console.log(JSON.stringify(results));
    if (results.length > 1) {
      console.log("Multiple Entries exists, Delete one user");
      res.writeHead(301, {
        'Content-Type': 'text/plain'
      });
      res.send("Multiple Entries Exist, Please Contact Administrator");
    }

    else if (results.length === 0) {
      console.log("User Doesn't exist");
      res.writeHead(400, 'User Does not Exist', {
        'Content-Type': 'text/plain'
      });
      res.end();
    }

    else if (results.length === 1) {
      console.log('Successfully Retrieved the User');
      if(results[0].user_pwd === credentials.pwd){
        res.writeHead(200,results[0].restaurant_owner,{
          'Content-Type': 'text/plain'
        });
      }
      else{
        res.writeHead(400,'INVALID CREDENTIALS',{
          'Content-Type': 'text/plain'
        });
      }
      res.end();
    }

    else if (error) {
      console.log('Error Occured While Fetching the Data ' + error);
      res.writeHead(400, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }

    else {
      console.log('Unknown Fault Occured While Fetching the User');
      res.writeHead(500, 'Contact Administrator', {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
  });
});

module.exports = router;