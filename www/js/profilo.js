function profilo (){
  console.log("I'm inside profilo function");
  var session_id=localStorage.getItem("session_id");

  $("#logout").click(function(){
    console.log("cliccato bottone logout");
    logout();
  });

  $.ajax({
    url: "https://ewserver.di.unimi.it/mobicomp/geopost/profile",
    method: "GET",
    data: {
      session_id: session_id,
    },
    success: function(result){
      console.log(result);
      var username=result.username;
      var msg=result.msg;
      var mylat=result.lat;
      var mylon=result.lon;

      $("#username").html(username);
      $("#messaggio").html(msg);

      var myLatLng = {lat: mylat, lng: mylon};

      var map = new google.maps.Map(document.getElementById('googleMapProfilo'), {
        zoom: 4,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Posizione ultimo messaggio'
      });

    }


  });
}
