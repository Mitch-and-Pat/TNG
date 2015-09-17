var Officer = require('./officer.js');
var fs = require('fs');
var _ = require('lodash');

var Manifest = function() {
  this.officers = [];

  // Read cache from counter.txt file
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());

  // Read last users.json file and parse into object
  var currentDB = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
  var currentList = JSON.parse(currentDB.toString());

  // Rebuild Officers for each object in JSON array and push to this.officers
  for (var i = 0 ; i < currentList.length; i++) {
    var newOfficer = new Officer(currentList[i].full_name, currentList[i].email,currentList[i].user_name, currentList[i].transmissions);
    this.officers.push( newOfficer);
  }
};


Manifest.prototype.addOfficer = function(full_name,email,user_name) {

  // TODO: Set up warning if user already exists
  var userExists = false;
  if (userExists) {
    alert("That username is already taken. Please log in if it is you.");
  } else {

    // Create new Officer with params passed to prototype
    var newOfficer = new Officer(full_name,email,user_name);


    this.officers.push(newOfficer);
    console.log(this.officers);
    this.saveJSON();
}
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

Manifest.prototype.getTransmissions = function (username) {
  for (var i=0; i<this.officers.length; i++) {
    if (username === this.officers[i].user_name) {
      return this.officers[i].transmissions;
    }
  }
};

Manifest.prototype.linkLog = function (username, logIndex) {
  for (var i=0; i<this.officers.length; i++) {
    if (username === this.officers[i].user_name) {
      this.officers[i].transmissions.push(logIndex);
    }
  }
  this.saveJSON();
};

Manifest.prototype.saveJSON = function () {
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  fs.writeFileSync(__dirname + '/../db/' + (cache + 1) + '_users.json', JSON.stringify(this.officers, null, 4));
  fs.writeFileSync(__dirname + '/../db/counter.txt', (cache + 1));
  fs.unlink(__dirname + '/../db/' + (cache - 2) + '_users.json');
};


module.exports = Manifest;
