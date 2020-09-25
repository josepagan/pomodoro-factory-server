const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const taskLists = require('./routes/taskLists');
const home = require('./routes/home');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

require('dotenv').config();
const port = process.env.PORT || '3010';
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/pomodoro-factory';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, mongoOptions)
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.error('Couldnt connect to mongodb', err));



const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence' });
console.log(silence)
silence.save().then(console.log('all OK'))

app.use('/', home);
app.use('/api/taskLists', taskLists);

app.listen(port, () => console.log(`App listening at ${port}`))
