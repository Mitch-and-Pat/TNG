var express = require('express');
var router = express.Router();

//var Officer = require('./models/officer.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('your face is awesome');
});

module.exports = router;
