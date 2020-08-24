const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const tasks = ["task1", "task2", "task3"];

const app = express();
const port = process.env.PORT;
app.set('view engine','pug');


app.use(express.static('public'))
app.use(helmet());
app.use(morgan('tiny'));

app.get('/',(req, res) => {
  console.log(process.env.HOST);
  res.render('index', {
    title: "My express App",
    message: "Hello world html edition"
  });

  app.get('/api/tasks', (req, res) => {
    res.send(tasks)
  } )



});
app.listen(port, () => console.log(`App listening at ${port}`))
