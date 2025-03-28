const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');  // Assuming your GraphQL schema is in schema.js

const app = express();

// Replace this with your MongoDB Atlas connection string.
const dbURI = 'mongodb+srv://lucassuntha:Dalybred60@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

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
