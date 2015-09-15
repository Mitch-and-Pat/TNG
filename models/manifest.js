var Officer = require('./officer.js');
var fs = require('fs');


var Manifest = function() {
  this.officers = [];
  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  var currentDB = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
  var currentList = JSON.parse(currentDB.toString());
  for (var i = 0 ; i < currentList.length; i++) {
    var newOfficer = new Officer(currentList[i].full_name, currentList[i].email,currentList[i].user_name);
    this.officers.push( newOfficer);
  }
  console.log(this.officers);
};


Manifest.prototype.testMethod = function() {
  console.log("Manifest test method");
}

Manifest.prototype.addOfficer = function(full_name,email,user_name) {

  var cache = parseInt(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
  console.log(cache);
  var userExists = false;
  if (userExists) {
    var m = JSON.parse(fs.readFileSync(__dirname + '/../db/counter.txt').toString());
    alert("That username is already taken. Please log in if it is you.");
  } else {
    console.log("Signup is posting!");
    var newOfficer = new Officer(full_name,email,user_name);
    var n = fs.readFileSync(__dirname + '/../db/' + cache + '_users.json');
    var o = JSON.parse(n.toString());
    o[Object.keys(o).length] = newOfficer;
    console.log(o);
    fs.writeFileSync(__dirname + '/../db/' + (cache + 1) + '_users.json', JSON.stringify(o));
  }
  fs.writeFileSync(__dirname + '/../db/counter.txt', (cache + 1));

};



module.exports = Manifest;
