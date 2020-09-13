const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    pomodorosCount:{
      type: Number,
      required: true,
      default: 0
    },
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    date: { type: Date, defaut: Date.now() } 
  })

const Task = mongoose.model('Task', taskSchema)

module.exports.taskSchema = taskSchema
module.exports.Task = Task