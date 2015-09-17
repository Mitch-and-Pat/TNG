var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');


/* GET home page with login redirection. */
router.get('/', function(req, res, next) {
  if(req.cookies.userid) {
      console.log(" -- index route -- ");
      res.render('index',  req.app.locals.manifest.getOfficer(req.cookies.userid) );
  } else {
      console.log(" -- login route -- ");
      res.redirect('/login');
  }
});

/* POST new log from user logged in home. */
router.post('/newlog', function (req, res, next) {
  // Add log to shipslog
  req.app.locals.shipslog.addLog(req.body.text, req.body.img, req.app.locals.manifest.getOfficer(req.cookies.userid));
  // Add log index number to officer transmissions array
  req.app.locals.manifest.linkLog(req.cookies.userid, (req.app.locals.shipslog.logs.length - 1));
  res.send("");
});

/* GET login page.*/
router.get('/login', function(req,res,next){
    if (req.app.locals.manifest.verify(req.query.user_name)){
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
  req.app.locals.manifest.addOfficer( req.body.full_name, req.body.email, req.body.user_name);
  res.cookie("userid" ,req.body.user_name);
  //Redirect to their home feed
  res.redirect( '/' );
});

/* GET stream refresh every X seconds. */
router.get('/stream', function (req, res) {
  res.send(req.app.locals.shipslog);
});



module.exports = router;
