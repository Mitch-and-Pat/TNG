var express = require('express');
var router = express.Router();
var _ = require('lodash');

/* GET user page. */
router.get('/:user', function(req, res, next) {
  res.render('user', req.app.locals.manifest.getOfficer(req.params.user));
});

/* GET user stream (refresh every X seconds?) */
router.get('/:user/userstream', function (req, res, next) {
  // var logIndexes = req.app.locals.manifest.getOfficer(user).transmissions;
  console.log(req.app.locals.manifest.getOfficer(user).transmissions);
  res.send(req.app.locals.manifest.getOfficer(user));
  // res.send("");
});

module.exports = router;
