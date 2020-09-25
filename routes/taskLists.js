const express = require('express');
const router = express.Router();
const { Task } = require('../models/task');
const TaskList = require('../models/taskList');

async function createTaskList(name){
  const taskList = new TaskList({
    name,
    tasks: []
  })
  await taskList.save();
}

//TODO add error handling here too...
//TODO addTask must return an error or the saved document so we know it is working properly

async function addTask(tasklistId, text) {
  const tasklist = await TaskList.findById(tasklistId);
  const task = new Task({text: text});
  tasklist.tasks.push(task);
  await tasklist.save();
  return task
}
// createTaskList("third tasklist");
// addTask('5f62055db5aef55386b428fb', "ir a hacer caca")
// addTask('5f62055db5aef55386b428fb', "go to see helen")

async function removeTask(taskId) {
  //TODO finish this shit!!!
}


router.get('/', async (req, res) => {
  const result = await TaskList.find();
  res.send(result);
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
router.post('/', async (req, res) => {
//TODO implement validation 
  // const { error } =  validateTask(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // console.log(req.body);
  const { _id, text } = req.body;
  // console.log(_id, text);
 const returned =  await addTask(_id, text);
 console.log('returnded!!',returned)
  res.send(returned);
//
  
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
