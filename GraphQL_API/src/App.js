import React from 'react';

const App = () => {
  return (
    <div>
      <h1>My Apollo React App</h1>
      {/* You can add more functionality and GraphQL queries here */}
    </div>
  );
};

export default App;
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');  // Assuming your GraphQL schema is in schema.js

const app = express();

// Replace this with your MongoDB Atlas connection string.
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Connect to MongoDB using mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Setup GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

// Start the Express server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
