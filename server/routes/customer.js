const express = require('express');
const router = express.Router();

const connection = require('../resources.js');

router.get('/api/getAllRestaurants', async (req, res) => {
    await connection.query('SELECT * FROM restaurants', async function (error, results) {
        if (error) {
            console.log("Not Successfull");
            res.send(JSON.stringify(error));
        }
        else {
            console.log('Successfully Retrieved the restaurants');
            res.send(JSON.stringify(results));
        }
    });
});

router.post('/api/getDishesbyResId', async (req, res) => {
    const restaurantId = req.body.restaurantId;
    console.log('Fetching for dishes ....');
    const select_dishes_sql = `SELECT * FROM dishes where restaurant_id = ?`
    await connection.query(select_dishes_sql, [restaurantId] ,async function (error, results) {
        if (error) {
            console.log("Not Successfull");
            res.send(JSON.stringify(error));
        }
        else {
            console.log('Successfully Retrieved the restaurants');
            res.send(JSON.stringify(results));
        }
    });
});

router.post('/api/sendOrders', async (req, res) => {
    const custEmailId = req.body.custEmailId;
    const restaurantId = req.body.restaurantId;
    const dishes = req.body.dishes;
    const deliveryAddress = req.body.deliveryAddress;
    const orderTimeStamp = req.body.orderTimeStamp;
    const paymentMode = req.body.paymentMode;
    const totalPrice = req.body.totalPrice;

    console.log('Saving Order....');
    const insert_order_query = `INSERT INTO orders ( cust_email_id, restaurant_id, dishes_ordered, delivery_address, order_timestamp, payment_mode, order_price, status) values (?,?,?,?,?,?,?,'RECIEVED')`
    await connection.query(insert_order_query, [custEmailId, restaurantId, dishes, deliveryAddress, orderTimeStamp, paymentMode, totalPrice] ,async function (error, results) {
        if (error) {
            console.log("Not Successfull");
            res.send(JSON.stringify(error));
        }
        else {
            console.log('Successfully Recieved an Order');
            res.send(JSON.stringify(results));
        }
    });
});

router.post('/api/getOrdersByCustEmail', async (req, res) => {

    const select_orders_query = `select * from orders where cust_email_id = ?`
    await connection.query(select_orders_query, [req.body.emailId], async function (error, results) {
      console.log(JSON.stringify(results));
      if (results.length === 0) {
        console.log('No Orders Found for this Customer  ');
        res.send(JSON.stringify(results));
      }
  
      else if (results.length > 0) {
        console.log('Successfully Retrieved the Orders for this Customer');
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

module.exports = router;