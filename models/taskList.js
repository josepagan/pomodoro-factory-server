const mongoose = require('mongoose');
const Joi = require('joi');
const { taskSchema } = require("./task");

const taskListSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  tasks: [taskSchema]
});

const Tasklist = mongoose.model('Tasklist', taskListSchema);

module.exports = Tasklist