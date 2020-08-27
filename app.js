const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const tasks = require('./routes/tasks')
const home = require('./routes/home')

app.set('view engine','pug');
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT;


const validateCourse = (body) => {
  const schema = Joi.object({
    text: Joi.string().required()
  })
  return schema.validate(body)
}

app.use('/',home);
app.use('/api/tasks',tasks);



app.listen(port, () => console.log(`App listening at ${port}`))
