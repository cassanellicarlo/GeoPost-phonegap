// genera la mappa con i markers
function mappaAmici (){

  $("#mostraLista").click(function(){
      console.log("click bottone lista");
      $("#googleMap").hide();
      $("#lista-amici").show();
      $("#mostraLista").removeClass("btn btn-secondary");
      $("#mostraLista").addClass("btn btn-primary");
      $("#mostraMappa").removeClass("btn btn-primary");
      $("#mostraMappa").addClass("btn btn-secondary");
      listaAmici();

    });

    console.log("I'm inside mappaAmici function");

    var bounds = new google.maps.LatLngBounds(); //create empty LatLngBounds object
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


    for(var i=0;i<friend_list.getFriends().length;i++){
      //console.log(friend_list.getFriends()[i]);
      var lat=friend_list.getFriends()[i].lat;
      var lon=friend_list.getFriends()[i].lon;
      var coordinate = new google.maps.LatLng(lat,lon);
      var marker = new google.maps.Marker({
        position: coordinate,
        map: map
      });

      //extend the bounds to include each marker's position
      bounds.extend(marker.position);

      // finestra di info con nome utente e messaggio
      var infowindow = new google.maps.InfoWindow();
      // per ogni marker aggiungo un click listener che mi apre la info window
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var username=friend_list.getFriends()[i].username;
          var msg=friend_list.getFriends()[i].msg;
          var testo="<h4>"+username+"</h4><br><p>"+msg+"</p>";
          infowindow.setContent(testo);
          infowindow.open(map, marker);
        }
      })(marker, i));

      //now fit the map to the newly inclusive bounds
      map.fitBounds(bounds);
    } // for

}
