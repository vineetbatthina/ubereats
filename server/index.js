const express = require('express');
const app = express(),
  bodyParser = require("body-parser");
Cors = require("cors"),
  port = 3080;

app.use(bodyParser.json());
app.use(Cors());

const customer_router = require('./routes/customer');
app.use(customer_router);

const users_router = require('./routes/users');
app.use(users_router);

const restaurant_router = require('./routes/restaurants');
app.use(restaurant_router);

const index_router = require('./routes/index');
app.use(index_router);

app.get('/', (req, res) => {
  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

module.exports = app;