var Officer = require('./officer.js');
var fs = require('fs');
var _ = require('lodash');

var Manifest = function() {
  this.officers = [];
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  var currentDB = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
  var currentList = JSON.parse(currentDB.toString());
  for (var i = 0 ; i < currentList.length; i++) {
    var newOfficer = new Officer(currentList[i].full_name, currentList[i].email,currentList[i].user_name);
    this.officers.push( newOfficer);
  }
  //console.log(this.officers);
};


Manifest.prototype.addOfficer = function(full_name,email,user_name) {
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  //console.log(cache);
  var userExists = false;
  if (userExists) {
    var m = JSON.parse(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
    alert("That username is already taken. Please log in if it is you.");
  } else {
    //console.log("Signup is posting!");
    // console.log(full_name + " " + email + " " + user_name);
    var newOfficer = new Officer(full_name,email,user_name);
    // console.log(newOfficer);
    // var n = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
    // var o = JSON.parse(n.toString());
    // o[Object.keys(o).length] = newOfficer;
    //console.log(o);
    this.officers.push(newOfficer);
    fs.writeFileSync(__dirname + '/../db/' + (cache + 1) + '_users.json', JSON.stringify(this.officers));
  }
  fs.writeFileSync(__dirname + '/../db/counter.txt', (cache + 1));

};

Manifest.prototype.verify = function (username) {
  var zee = false;
  this.officers.forEach(function (element, index) {
    //console.log(element.getUserName());
    //console.log(username === element.getUserName());
    if (username === element.getUserName()) {
      zee = true;
    }
  });
  return zee;
};

Manifest.prototype.getOfficer = function (username) {
  for (var i=0; i<this.officers.length; i++) {
    if (username === this.officers[i].user_name) {
      return this.officers[i];
    }
  }
};

Manifest.prototype.linkLog = function (username, logObj) {
  for (var i=0; i<this.officers.length; i++) {
    if (username === this.officers[i].user_name) {
      this.officers[i].transmissions.push(logObj);
    }
  }
  this.save();
};

Manifest.prototype.save = function () {
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  fs.writeFileSync(__dirname + '/../db/' + (cache + 1) + '_users.json', JSON.stringify(this.officers));
  fs.writeFileSync(__dirname + '/../db/counter.txt', (cache + 1));
};


module.exports = Manifest;
