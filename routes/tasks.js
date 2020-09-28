const express = require('express');
const router = express.Router();
const { Task } = require('../models/task');
const { TaskList, taskListSchema } = require('../models/taskList');




router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id))
    res.send(task || "task not found")
})



router.post('/', async (req, res) => {
    //TODO implement validation 
    // const { error } =  validateTask(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // console.log(req.body);
    const { _id, text } = req.body;
    // console.log(_id, text);
    const returned = await addTask(_id, text);
    console.log('returnded!!', returned)
    res.send(returned);


})





async function findAllTasks() {
    const result = await TaskList.find()
    const tasks = result.map(el => el.tasks)
    console.log(tasks)
}

async function addTask(tasklistId, text) {
    const tasklist = await TaskList.findById(tasklistId);
    const task = new Task({ text: text });
    tasklist.tasks.push(task);
    await tasklist.save();
    return task
}

module.exports = router