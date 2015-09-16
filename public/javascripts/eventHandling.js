// Fix the '/' route post and stop from reloading **AJAX POST request**
// Server route to handle ajax post requests

// Put client on a timer. Ajax get requests every x seconds or so.
// Server route to handle ajax get requests
$(document).ready(function () {
  $("#log").bind("submit", function (event) {
    console.log(event);
    console.log(this);
    event.preventDefault();
    // ajax POST request to server
    var log = $("textarea[name=log]").val();
    var image = $("input[name=image]").val();
    console.log(log);
    console.log(image);
    jQuery.ajax({
      url: "/newlog",
      method: "POST",
      data: {
        "text": log,
        "img": image
      }
    });
  });
});
