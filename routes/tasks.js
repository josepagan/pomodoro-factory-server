const express = require('express');
const router = express.Router();

const tasks = [
  {
    id: 1,
    text:"create proper structure",
    pomodoros: 2,
    completed: false
  }
];

router.get('/', (req, res) => {
  res.send(tasks)
})

router.get('/:id', (req,res) => {
  const task = tasks.find(t=> t.id === parseInt( req.params.id ))
  res.send(task || "task not found")
})

//this put request only changes the name, what if we have to change something else
router.put('/:id', (req,res) => {
  const task = tasks.find(t => t.id === parseInt( req.params.id ))

  const { error } =  validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  task.text = req.body.text;
  
  res.send(task || "task not found")
})

router.post('/', (req, res) => {

  const { error } =  validateCourse(req.body);
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
