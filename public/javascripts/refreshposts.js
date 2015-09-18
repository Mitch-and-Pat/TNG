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
    // Check for and skip deleted flags
    if (element.deleted !== true) {
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
      $content.html(element.text);
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
      $delete.attr("class", "delete");
      $delete.text("Delete");
      $form.attr("action", "/");
      $form.attr("method", "delete");
      $form.attr("class", "delete");
      $form.attr("id", index);


      // Append to log
      $form.append($delete);
      $form.submit(function (event) {
        event.preventDefault();
        var logIndex = $(this).attr("id");
        jQuery.ajax({
          url: "/delete/" + $(this).attr("id"),
          method: "DELETE",
        });
      });
      $listitem.append($form);
    }

    // Append list item to the list
      $container.prepend($listitem);
    }
  });

}

refreshPosts();
window.setInterval( function() { refreshPosts(); }, 10000 );
});
