const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
  res.render('index', {
    title: "My express App",
    message: "Hello world html edition",
    text: "this is the only endpoint that you human can read properly"
  });
});

module.exports = router
