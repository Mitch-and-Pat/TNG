var Log = function (text, img, user) {
  // Do we need an ID?
  // this.id = randomID;
  this.text = text;
  this.img = img;
  this.user = user;
  this.relays = [];
  this.favorites = [];
};

// Log.prototype.

module.exports = Log;
