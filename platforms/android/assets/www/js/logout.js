function logout(){
  console.log("I'm inside logout function!");
  var session_id=localStorage.getItem("session_id");

  $.ajax({
    url: "https://ewserver.di.unimi.it/mobicomp/geopost/logout",
    method: "GET",
    data: {
      session_id: session_id,
    },
    success: function(result){
      console.log("Logout effettuato!");
      localStorage.removeItem("session_id");

      $("#page").load("login.html",function (){
        login();
        $("#navigation").hide();
      });

    }


  });
}
