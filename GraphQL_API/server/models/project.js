const mongoose = require('mongoose');

// Create a Mongoose schema for the project
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// Create a model based on the project schema, which will be linked to the "Project" collection in MongoDB
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
