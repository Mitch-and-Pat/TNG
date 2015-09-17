var Log = require('./log.js');
// var express = require('express');
// var Manifest = require('./manifest.js');
// var router = require('../routes/index.js');
var fs = require('fs');
var _ = require('lodash');


var ShipsLog = function () {
  this.logs = [];
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/log_counter.txt').toString());
  var currentDB = fs.readFileSync(__dirname + '/../db/' + cache + '_logs.json');
  var currentList = JSON.parse(currentDB.toString());
  for (var i = 0 ; i < currentList.length; i++) {
    var newLog = new Log(currentList[i].text, currentList[i].img, currentList[i].user);
    this.logs.push( newLog);
  }
};

ShipsLog.prototype.addLog = function(text,img,user) {
  var newLog = new Log(text,img,user);
  // console.log(newLog);
  this.logs.push(newLog);
  this.saveJSON();
};

ShipsLog.prototype.saveJSON = function () {
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/log_counter.txt').toString());
  fs.writeFileSync(__dirname + '/../db/' + (cache + 1) + '_logs.json', JSON.stringify(this.logs));
  fs.writeFileSync(__dirname + '/../db/log_counter.txt', (cache + 1));
  fs.unlink(__dirname + '/../db/' + (cache - 2) + '_logs.json');
};


module.exports = ShipsLog;
