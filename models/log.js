var Log = function (text, img, user, deleted) {
  // Do we need an ID?
  // this.id = randomID;
  this.text = text;
  this.img = img;
  this.user = user;
  this.relays = [];
  this.favorites = [];
  this.deleted = deleted;
};

// Log.prototype.

module.exports = Log;
