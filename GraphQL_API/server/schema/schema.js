const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql');

// Define the TaskType object
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  })
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // This is where you would implement your database query
        return null;
      }
    }
  }
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery
});
