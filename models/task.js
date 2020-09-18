const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
      default: "change my name"
    },
    pomodorosCount: {
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
      // i wonder if I can use schemas in a recursive way, like
      // innerTaskLists: [ taskListSchema ]

  })

  const validateTask = (body) => {
    const schema = Joi.object({
      text: Joi.string().required()
    })
    return schema.validate(body)
  }

const Task = mongoose.model('Task', taskSchema)

// const bbqtask = new Task()
// console.log(bbqtask)

module.exports.taskSchema = taskSchema
module.exports.Task = Task