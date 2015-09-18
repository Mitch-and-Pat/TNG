function Officer (full_name, email, user_name, transmissions, profile_photo) {
  this.full_name = full_name;
  this.email = email;
  this.user_name = user_name;
  this.transmissions = transmissions;
  this.profile_photo = "http://lorempixel.com/100/100/people" && profile_photo;
}

Officer.prototype.getTransmissions = function() {
  return this.transmissions;
};

Officer.prototype.getUserName = function() {
  return this.user_name;
};

module.exports = Officer;
