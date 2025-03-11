const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

// Define the TaskType object
const TaskType = new GraphQLObjectType({
  name: 'Task', // The name of the object type
  fields: () => ({
    id: { type: GraphQLString }, // id field, type is GraphQLString
    title: { type: GraphQLString }, // title field, type is GraphQLString
    weight: { type: GraphQLInt }, // weight field, type is GraphQLInt
    description: { type: GraphQLString } // description field, type is GraphQLString
  })
});

module.exports = TaskType;
