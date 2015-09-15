/*

var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

// GET login page.
router.get('/', function(req, res, next) {
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  var n = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
  var o = JSON.parse(n.toString());
  console.log(o);
  console.log(o[0]);
  console.log(o.constructor);

  //var p = [];
  //o.forEach(function(index,element){
  //  p.push(element.getUserName());
  //});

  res.render('login', { title: 'Login' });
});



module.exports = router;

*/
