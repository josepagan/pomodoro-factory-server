const express = require('express');
const { taskListSchema } = require('./taskList');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    taskLists: [taskListSchema],
  });
  
  const User = mongoose.model('User', userSchema);
  
  console.log('FUCK')
  module.exports = User

  //TODO try to run an user, to se what the fUck is going on with this.