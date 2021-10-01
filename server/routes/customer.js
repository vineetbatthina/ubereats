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

module.exports = router;