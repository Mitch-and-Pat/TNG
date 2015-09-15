var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');
var Manifest = require('../models/manifest.js');

var manifest = new Manifest();
/* GET home page with login redirection. */
router.get('/', function(req, res, next) {
  if(req.cookies.userid) {
      console.log(" -- index route -- ");
      res.render('index', { title: 'Trekr' });
  } else {
    console.log(" -- login route -- ");
    var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
    var n = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
    var o = JSON.parse(n.toString());
    console.log(o);
    console.log(o[0]);
    console.log(o.constructor);
    res.render('login', { title: 'Login' });
  }
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

/* POST signup interaction. */
router.post('/signup', function (req, res) {
  console.log("you posted bro");
  manifest.addOfficer( req.body.full_name, req.body.email, req.body.user_name);
});

module.exports = router;
