var Log = require('./log.js');
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
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/log_counter.txt').toString());
  var newLog = new Log(text,img,user);
  var n = fs.readFileSync(__dirname + '/../db/' + cache + '_logs.json');
  var o = JSON.parse(n.toString());
  o[Object.keys(o).length] = newLog;
  fs.writeFileSync(__dirname + '/../db/' + (cache + 1) + '_logs.json', JSON.stringify(o));
  fs.writeFileSync(__dirname + '/../db/log_counter.txt', (cache + 1));
  return o[Object.keys(o).length];
};


module.exports = ShipsLog;
