const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

// Import the schema from schema.js
const schema = require('./schema');

// Setup the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// Start the server
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});