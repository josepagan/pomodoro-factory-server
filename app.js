const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;
app.get('/',(req, res) => {
  console.log(process.env.HOST);
  res.send("Hello World!")
});
app.listen(port, ()=> console.log(`App listening at ${port}`))
