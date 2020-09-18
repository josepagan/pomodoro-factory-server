const mongoose = require('mongoose');
const Joi = require('joi');
const { taskSchema } = require("./task");

const taskListSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  tasks: [taskSchema],
  // i wonder if I can use schemas in a recursive way, like
  innerTaskLists: [ taskListSchema ]
});

const Tasklist = mongoose.model('Tasklist', taskListSchema);

module.exports = Tasklist