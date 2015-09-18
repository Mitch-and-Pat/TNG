var express = require('express');
var router = express.Router();
var _ = require('lodash');

/* GET user page. */
router.get('/:user', function(req, res, next) {
  // console.log(req.app.locals.manifest.getTransmissions(req.params.user));
  res.render('user', req.app.locals.manifest.getOfficer(req.params.user));
});

/* GET user stream (refresh every X seconds?) */
router.get('/:user/userstream', function (req, res, next) {
  var logIndexes = req.app.locals.manifest.getTransmissions(req.params.user);
  var allLogs = _.map(req.app.locals.shipslog.logs, _.clone);
  var logObjs = {};
  logObjs.logs = _.pullAt(allLogs, logIndexes);
  res.send(logObjs);
});

module.exports = router;
