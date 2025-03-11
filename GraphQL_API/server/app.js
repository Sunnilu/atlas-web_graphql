const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const TaskType = require('./schema'); // Import the TaskType from schema.js

const app = express();

// Define the schema, now using TaskType
const schema = buildSchema(`
  type Query {
    task: Task
  }

  type Task {
    id: String
    title: String
    weight: Int
    description: String
  }
`);

// Root resolver
const root = {
  task: () => ({
    id: '1',
    title: 'Sample Task',
    weight: 10,
    description: 'This is a description for the task.'
  })
};

// Setup the GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL UI in the browser
}));

// Start the server
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
