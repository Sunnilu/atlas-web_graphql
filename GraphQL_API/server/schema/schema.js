const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = require('graphql');
const mongoose = require('mongoose');
const Project = require('./models/project');  // Import Project model
const Task = require('./models/task');        // Import Task model
const { GraphQLList } = require('graphql');

// Define the TaskType object
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

// Define the ProjectType object
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
        // Get all tasks related to this project from the database
        return Task.find({ projectId: parent.id });  // Fetch tasks linked to the projectId
      }
    }
  })
});

// Define the RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // Find a task by ID from MongoDB
        return Task.findById(args.id);  // Query the Task collection by ID
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // Find a project by ID from MongoDB
        return Project.findById(args.id);  // Query the Project collection by ID
      }
    },
    // Fetch all tasks
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Fetch all tasks from the MongoDB database
        return Task.find();  // Retrieve all tasks
      }
    },
    // Fetch all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // Fetch all projects from the MongoDB database
        return Project.find();  // Retrieve all projects
      }
    }
  }
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

        return project.save();  // Save the new project to the database
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
          projectId: args.projectId  // Link task to a specific project
        });

        return task.save();  // Save the new task to the database
      }
    }
  }
});

// Export the schema with RootQuery and Mutation
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

