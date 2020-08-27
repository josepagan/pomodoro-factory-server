const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const tasks = [
  {
    taskID:1,
    text:"create proper structure",
    pomodoros:2,
    completed:false
  }
];

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
} )

app.post('/api/tasks', (req, res) => {
  const schema = Joi.object({
    text:Joi.string().required()
  })

  const result = schema.validate(req.body)
  console.log(result)
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }

  const newtask = {
    //id to be assigned by database eventually
    taskID:tasks.length + 1,
    text:req.body.tasktext,
    pomodoros:0,
    completed:false
  }
  tasks.push(newtask);
  res.send(newtask);
});


app.listen(port, () => console.log(`App listening at ${port}`))
