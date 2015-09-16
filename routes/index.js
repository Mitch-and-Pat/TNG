var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');
var Manifest = require('../models/manifest.js');
var ShipsLog = require('../models/shipslog.js');

var shipslog = new ShipsLog();
var manifest = new Manifest();

/* GET home page with login redirection. */
router.get('/', function(req, res, next) {
  if(req.cookies.userid) {
      console.log(" -- index route -- ");
      res.render('index', { title: 'Trekr' });
  } else {
    console.log(" -- login route -- ");
    res.redirect('/login');
  }
});

/* POST new log from user logged in home. */
router.post('/', function (req, res, next) {
  var linkOfficer = manifest.getOfficer(req.cookies.userid);
  var addedLog = shipslog.addLog(req.body.text, req.body.img, linkOfficer);
  manifest.getOfficer(req.cookies.userid).transmissions.push(addedLog);
});

/* GET signup page.*/
router.get('/login', function(req,res,next){
    if (manifest.verify(req.query.user_name)){
      console.log("A valid user_name has been submitted");
        //Assign a cookie
        res.cookie("userid" ,req.query.user_name);
        //Redirect to their home feed
        res.redirect( '/' );
    } else {
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
