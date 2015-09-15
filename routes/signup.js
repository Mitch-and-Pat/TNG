/*

var express = require('express');
var router = express.Router();
var fs = require('fs');
var Manifest = require('../models/manifest.js');

var manifest = new Manifest();

// GET signup page.
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

// POST signup interaction.
router.post('/', function (req, res) {
  console.log("you posted bro");
  manifest.addOfficer( req.body.full_name, req.body.email, req.body.user_name);
});





module.exports = router;

*/
