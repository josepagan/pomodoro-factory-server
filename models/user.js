const express = require('express');
const router = express.Router();
const { taskListSchema } = require('./taskList');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    taskLists: [taskListSchema],
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User