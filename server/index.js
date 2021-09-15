const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      Cors = require("cors"),
      port = 3080;

// place holder for the data
const users = ['Vineet'];

app.use(bodyParser.json());
app.use(Cors());

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!')
  res.json(users);
});

app.post('/api/createUser', (req, res) => {
    console.log(req.body);
  const user = req.body.user;
  console.log('Adding user::::::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});