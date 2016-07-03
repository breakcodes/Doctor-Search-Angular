//This is the main file which handles routing of urls
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	console.log('hello');
  res.send('Welcome to Practo');
});

router.use('/doctors', require('./routes'));

module.exports = router;
