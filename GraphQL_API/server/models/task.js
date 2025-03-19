const mongoose = require('mongoose');

// Create a Mongoose schema for the task
const taskSchema = new mongoose.Schema({
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
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',  // This will create a reference to the Project model
    required: true
  }
});

// Create a model based on the task schema, which will be linked to the "Task" collection in MongoDB
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
