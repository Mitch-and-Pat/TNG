$(document).ready(function () {

function refreshPosts () {
  $.getJSON('posts.json', function () {

  });
}

window.setInterval(10000, refreshPosts);
});
