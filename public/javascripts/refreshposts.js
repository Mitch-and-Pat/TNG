$(document).ready(function () {

function refreshPosts() {
  jQuery.ajax({
    url: "/stream",
    method: "GET",
    datatype: "json",
    success: function (data) {
      renderPosts(data);
    }
  });
  console.log("Posts have been refreshed!");
}

function renderPosts(data) {
  $container = $(".transmissions_ol").text("");
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

    // Add delete button if cookie user and element user match
    if (document.cookie.split("=")[1] === element.user.user_name) {
      // Make elements
      var me = element.user.user_name;
      var $form = $("<form>");
      var $delete = $("<button>");

      // Set attributes
      $delete.attr("name", me);
      $delete.attr("id", index);
      $delete.text("Delete");
      $form.attr("action", "/");
      $form.attr("method", "get");
      $form.attr("class", "delete");


      // Append to log
      $form.append($delete);
      $listitem.append($form);
    }

    // Append list item to the list
      $container.prepend($listitem);
  });


  // console.log(data);
}

refreshPosts();
window.setInterval( function() { refreshPosts(); }, 10000 );
});
