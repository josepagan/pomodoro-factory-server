const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Tasklist = require('../models/taskList');

async function createTaskList(name){
  const taskList = new Tasklist({
    name,
    tasks: []
  })
  await taskList.save();
}

async function addTask(tasklistId, text) {
  const tasklist = await Tasklist.findById(tasklistId);
  const task = new Task({text: text});
  tasklist.tasks.push(task);
  await tasklist.save();
}
// addTask('5f5f9a38065eb405035c4cf7', "ir a hacer caca")
// addTask('5f5f9a38065eb405035c4cf7', "go to see helen")
// createTaskList("second tasklist");



router.get('/', async (req, res) => {
  const result = await Tasklist.find()
  res.send(result)
})

router.get('/:id', (req,res) => {
  const task = tasks.find(t=> t.id === parseInt( req.params.id ))
  res.send(task || "task not found")
})

//this put request only changes the name, what if we have to change something else
router.put('/:id', (req,res) => {
  const task = tasks.find(t => t.id === parseInt( req.params.id ))

  const { error } =  validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  task.text = req.body.text;

  res.send(task || "task not found")
});

//must integrate this with database
router.post('/', (req, res) => {

  const { error } =  validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newtask = {
    //id to be assigned by database eventually
    id: tasks.length + 1,
    text: req.body.text,
    pomodoros: 0,
    completed: false
  }
  tasks.push(newtask);
  res.send(newtask);
});

router.delete('/:id', (req,res) => {

  //finding
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id))
  //deleting
  if (taskIndex !== -1 ) {
    const deleted =  tasks.splice(taskIndex, 1)
    res.send(deleted)
  } else {
    res.send('could not find tasks with that ID')
  }
  //return deleted course
})

module.exports = router
