const mongoose = require('mongoose');
const Joi = require('joi');
const { taskSchema } = require("./task");

const taskListSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  tasks: [taskSchema],
  // innerTasklist: taskListSchema
  // naybe create a reference here
});

const TaskList = mongoose.model('TaskList', taskListSchema);

module.exports.TaskList = TaskList
module.exports.taskListSchema = taskListSchema
