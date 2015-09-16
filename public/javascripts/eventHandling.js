// Fix the '/' route post and stop from reloading **AJAX POST request**
// Server route to handle ajax post requests

// Put client on a timer. Ajax get requests every x seconds or so.
// Server route to handle ajax get requests
$(document).ready(function () {

function refreshPosts () {
  $.getJSON('posts.json', function () {

  });
}

window.setInterval(10000, refreshPosts);
});
