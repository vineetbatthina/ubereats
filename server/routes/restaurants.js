const express = require('express');
const router = express.Router();

const connection = require('../resources.js');

router.post('/api/createRestaurant', async (req, res) => {

    const restaurant = req.body;
    console.log('Adding a Restaurant', restaurant);
    const insert_restaurant_sql = `INSERT INTO restaurants (store_name, store_location , owner_name ) values (?,?,?)`
    await connection.query(insert_restaurant_sql,[restaurant.storeName, restaurant.storeLocation , restaurant.ownerName], async function (error,results){
      if(error){
        if(error.code==='ER_DUP_ENTRY')
        {
          res.writeHead(310,{
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
        console.log('Restaurant Added')
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        });
        res.end('Restaurant Added Successfully');
      }
    });
  });

  module.exports = router;