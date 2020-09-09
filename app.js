const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const tasks = require('./routes/tasks');
const home = require('./routes/home');
const mongoose = require('mongoose');

app.set('view engine','pug');
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(uri, mongoOptions)
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.error('Couldnt connect to mongodb', err));



app.use('/',home);
app.use('/api/tasks',tasks);



app.listen(port, () => console.log(`App listening at ${port}`))
