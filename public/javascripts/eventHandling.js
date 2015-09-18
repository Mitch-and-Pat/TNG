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
      },
      complete: function () {
        $("textarea[name=log]").val("");
        $("input[name=image]").val("");
      }
    });
  });
  $("#logout").on("click", function (event) {
    jQuery.ajax({
      url: "/logout",
      method: "GET",
      success: function() {
        console.log("Horseblog is so 2019");
      }
    }).done(
      function () {location.reload();}
    );
  });
  // $("form.delete").submit(function (event) {
  //   event.preventDefault();
  //   console.log("Delete event is beginning.");
  //   // var logIndex = $(this).attr("id");
  //   // var user_name = $(this).attr("name");
  //   jQuery.ajax({
  //     url: "/",
  //     method: "DELETE",
  //     data: {
  //       "index": logIndex,
  //       "user_name": user_name
  //     }
  //   });
  // });
});

/* ----- To insert in index.hbs ------*/
// <div class="logout-button">
//    <form action='/logout' method="get" id='logout'>
//     <input type='submit' value='Logout'></input>
//    </form>
// </div>
