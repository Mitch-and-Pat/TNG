$(document).ready(function () {


var postCounter = 0;

function refreshPosts() {
  jQuery.ajax({
    url: "/stream",
    method: "GET",
    datatype: "json",
    success: function (data) {
      renderPosts(data);
    }
  }).done(function() {
    console.log("Posts have been refreshed!");
    if ( $( "#__this_page_has_previous_and_next_buttons")[0] !== undefined && postCounter === 0 ) {
      showOnePost(postCounter);
      hideThisButton( "#previous-tweet-button" );
      console.log("you're looking at the first post");
    } else if ( $( "#__this_page_has_previous_and_next_buttons")[0] !== undefined && postCounter === ($(".transmissions_ol").children().length-1)) {
      showOnePost(postCounter);
      hideThisButton( "#next-tweet-button" );
      console.log("you're looking at the last post");
    } else if ( $( "#__this_page_has_previous_and_next_buttons")[0] !== undefined) {
      showOnePost(postCounter);
      showThisButton( "#previous-tweet-button" );
      showThisButton( "#next-tweet-button" );
      console.log( "you're looking at the a post, but not the first or last" );
    } else {
      console.log( "you're UI isn't cool" );
    }
  });
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
      $profileimage.attr("src", element.user.profile_photo);
      // TODO: Add to main .css file!
      $profileimage.css({
        "max-width": "100px",
        "max-height": "100px"
      });
      $names.text(element.user.full_name + " @" + element.user.user_name + " ");
      $names.attr("href", "/users/" + element.user.user_name);
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
        }).done(refreshPosts());
      });
      $listitem.append($form);
    }

    // Append list item to the list
      $container.prepend($listitem);
    }
  });

}

  function setNumber( domElement , int ) {
    $( domElement ).text( int );
  }


  function showOnePost(int) {
    var $transmissions = $( ".transmissions_ol" );
    var numOfLis = $transmissions.children().length;
    $transmissions.children().hide();
    var $thisPost = $($transmissions.children()[int]);
    $thisPost.show();
    //Set the count of this tweet
    setNumber( "#tweet-number" , postCounter + 1 );
    //Set the count of total tweets
    setNumber( "#total-tweets" , numOfLis );
  }

  function hideThisButton(varButton) {
    console.log("hide button function");
    $(varButton).prop("disabled",true);
    $( varButton ).css( "visibility", "hidden" );
  }

  function showThisButton(varButton) {
    $( varButton ).prop("disabled",false);
    $( varButton ).css( "visibility", "visible" );
  }

  //"Previous Tweet" Button Event Handler
  $( "#previous-tweet-button" ).bind( "click", function() {
    console.log("User clicked the 'previous' button");
    postCounter -= 1;
    refreshPosts();
  });
  //"Next Tweet" Button Event Handler
  $( "#next-tweet-button" ).bind( "click", function() {
    console.log("User clicked the 'next' button");
    postCounter += 1;
    refreshPosts();
  });

  if ( $("#__this_page_has_previous_and_next_buttons")[0] === undefined ) {
    refreshPosts();
    window.setInterval( function() { refreshPosts(); }, 10000 );
  } else {
    refreshPosts();
  }
});
