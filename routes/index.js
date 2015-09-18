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
  // Check for @ mentions
  var arr = req.body.text.split(" ");
  for (var i=0; i<arr.length; i++) {
    if ((arr[i].indexOf("@") >= 0) && (req.app.locals.manifest.verify(arr[i].slice(1, arr[i].length)))) {
      arr[i] = "<a href='/users/" + arr[i].slice(1, arr[i].length) + "'>" + arr[i] + "</a>";
    }
  var parsedLog = arr.join(" ");
  console.log(parsedLog);
  }
  // Add log to shipslog
  req.app.locals.shipslog.addLog(parsedLog, req.body.img, req.app.locals.manifest.getOfficer(req.cookies.userid));
  // Add log index number to officer transmissions array
  req.app.locals.manifest.linkLog(req.cookies.userid, (req.app.locals.shipslog.logs.length - 1));
  res.send("");
});

router.delete('/delete/:id', function (req, res, next) {
  // Remove log from shipslog instance (set delete flag) and save JSON
  req.app.locals.shipslog.removeLog(req.params.id, req.query.user_name);
  // Remove log from user transmissions array and save JSON
  req.app.locals.manifest.unlinkLog(req.query.user_name, req.params.id);
  res.sendStatus(200);
});

/* GET login page.*/
router.get('/login', function(req,res,next){
    if (req.app.locals.manifest.verify(req.query.user_name)){
      console.log("A valid user_name has been submitted");
        //Assign a cookie
        res.cookie("userid" ,req.query.user_name);
        //Redirect to their home feed
        res.redirect( '/' );
    } else if (!req.query.user_name) {
      res.render('login', { title: 'Login' });
    } else {
      // TODO: Make a better version with a pop-up
      // res.render('accessdenied');
      res.render('login', { title: 'Login' });
    }
});

/* GET logout page.*/
router.get('/logout', function(req,res,next){
    res.clearCookie('userid');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

/* POST signup interaction. */
router.post('/signup', function (req, res) {
  req.app.locals.manifest.addOfficer( req.body.full_name, req.body.email, req.body.user_name, [], req.body.profile_photo);
  res.cookie("userid" ,req.body.user_name);
  //Redirect to their home feed
  res.redirect( '/' );
});

/* GET stream refresh every X seconds. */
router.get('/stream', function (req, res) {
  res.send(req.app.locals.shipslog);
});



module.exports = router;
