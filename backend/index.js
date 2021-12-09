const express = require('express');
const schema = require('./GraphQLSchema/schema');
const {graphqlHTTP} = require('express-graphql');

const app = express(),
  bodyParser = require("body-parser");
Cors = require("cors"),
  port = 3080;

require('./resources.js');

app.use(bodyParser.json());
app.use(Cors({exposedHeaders: 'token'}));

app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));

const users_router = require('./routes/users');
app.use(users_router);

app.get('/', (req, res) => {
  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

module.exports = app;