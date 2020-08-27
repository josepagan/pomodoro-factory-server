const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const tasks = [
  {
    id: 1,
    text:"create proper structure",
    pomodoros: 2,
    completed: false
  }
];

const validateCourse = (body) => {
  const schema = Joi.object({
    text: Joi.string().required()
  })
  return schema.validate(body)
}


const app = express();
app.use(express.json());
const port = process.env.PORT;
app.set('view engine','pug');


app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.get('/',(req, res) => {
  res.render('index', {
    title: "My express App",
    message: "Hello world html edition"
  });

});

app.get('/api/tasks', (req, res) => {
  res.send(tasks)
})

app.get('/api/tasks/:id', (req,res) => {
  const task = tasks.find(t=> t.id === parseInt( req.params.id ))
  res.send(task || "task not found")
})

//this put request only changes the name, what if we have to change something else
app.put('/api/tasks/:id', (req,res) => {
  const task = tasks.find(t=> t.id === parseInt( req.params.id ))

  const { error } =  validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  task.name = req.body.name;
  
  res.send(task || "task not found")
})

app.post('/api/tasks', (req, res) => {

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


app.listen(port, () => console.log(`App listening at ${port}`))
