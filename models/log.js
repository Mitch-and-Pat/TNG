var Log = function (text, img, user, deleted, stardate) {
  // Do we need an ID?
  // this.id = randomID;
  this.text = text;
  this.img = img;
  this.user = user;
  this.relays = [];
  this.favorites = [];
  this.deleted = deleted;
  this.stardate = [] && stardate;
};

module.exports = Log;


Log.prototype.setStardate = function () {
  var date = new Date();
  var year4 = date.getFullYear();
  var year = "1" + year4.toString().split("").splice(2,2).join("");
  var month = date.getMonth() + 1;
  if (month < 10) {month = "0" + month;}
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  this.stardate = "" + year + month + "." + day + " " + hour + "." + minute + "." + second;
  console.log(this.stardate);
};

// Date.prototype.yyyymmdd = function() {
//    var yyyy = this.getFullYear().toString();
//    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
//    var dd  = this.getDate().toString();
//    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
//   };
//
// d = new Date();
// d.yyyymmdd();
