$(document).ready(function () {

function refreshUser() {
  var thisUser = window.location.href.split("/")[window.location.href.split("/").length - 1];
  var thisURL = "/users/" + thisUser + "/userstream";
  jQuery.ajax({
    url: thisURL,
    method: "GET",
    datatype: "json",
    success: function (data) {
      renderUser(data);
    },
    error: function (err) {
      console.log("Failed GET");
    }
  });
  // console.log("User posts have been refreshed!");
}

function renderUser(data) {
  $container = $(".user_transmissions_ol").text("");
  data.logs.forEach(function(element, index) {
    // create DOM elements
      // li wrapper
      var $listitem = $("<li>");
      // img for profile image
      var $profileimage = $("<img>");
      // name, username and link of tweeter
      var $names = $("<a>");
      // stardate of tweet
      var $stardate = $("<a>");
      // text content of the tweet
      var $content = $("<p>");
      // relay/upvote buttons
      var $relay = $("<button>");
      var $favorite = $("<button>");

    // Add content to DOM elements
      $profileimage.attr("src", "http://lorempixel.com/100/100"); //element.user.img
      $names.text(element.user.full_name + " " + element.user.user_name);
      $stardate.text("Sunday");
      $content.text(element.text);
      $relay.text(element.relays.length);
      $favorite.text(element.favorites.length);

    // Organize the DOM elements
      $listitem.append($profileimage, $names, $stardate, $content, $relay, $favorite);

    // Append list item to the list
      $container.prepend($listitem);
  });
}

refreshUser();
window.setInterval( function() { refreshUser(); }, 10000 );
});
