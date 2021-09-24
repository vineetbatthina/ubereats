const express = require('express');
const router = express.Router();

const connection = require('../resources.js');

router.get('/api/users',async (req, res) => {
    await connection.query('SELECT * FROM users', async function (error,results){
      if(error){
        console.log("Not Successfull");
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        });
        res.end(error.code);
      }
      else{
          console.log("Successfull");
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        });
        res.end(JSON.stringify(results));
      }
    });
  });

  router.post('/api/createUser', async (req, res) => {

    const user = req.body;
    console.log('Adding a User', user);
    const insert_user_sql = `INSERT INTO users (user_name,user_emailId,user_pwd,restaurant_owner) values (?,?,?,?)`
    await connection.query(insert_user_sql,[user.userName , user.userEmail , user.password,user.restaurantOwner], async function (error,results){
      if(error){
        if(error.code==='ER_DUP_ENTRY')
        {
          res.writeHead(301,{
            'Content-Type' : 'text/plain'
          });
          res.end(error.code);
        }
        else{
          res.writeHead(400,{
            'Content-Type' : 'text/plain'
          });
          res.end(error.code);
        }
      }
      else{
        console.log('User Added')
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        });
        res.end('User Added Successfully');
      }
    });
  });

module.exports = router;