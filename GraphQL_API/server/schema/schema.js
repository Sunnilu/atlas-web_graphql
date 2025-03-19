const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = require('graphql');
const mongoose = require('mongoose');
const Project = require('./models/project');  // Import Project model
const Task = require('./models/task');        // Import Task model
const { GraphQLList } = require('graphql');

// Define the TaskType object (already defined)
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    projectId: { type: GraphQLID }
  })
});

// Define the ProjectType object (already defined)
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({ projectId: parent.id });
      }
    }
  })
});

// Define the Mutation object
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add Project Mutation
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });

        return project.save();  // Save the project to MongoDB and return it
      }
    },

    // Add Task Mutation
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId  // Link the task to the given project ID
        });

        return task.save();  // Save the task to MongoDB and return it
      }
    }
  }
});

// Root Query (already defined)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Task.findById(args.id);  // Find task by ID from MongoDB
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Project.findById(args.id);  // Find project by ID from MongoDB
      }
    }
  }
});

// Export the schema with RootQuery and Mutation
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

