// Calcola la posizione dell'utente e la mostra sulla mappaAmici
// Per l'aggiornamento di stato

function getPosition(){
  console.log("i'm inside getPosition function");

  var options = {
    enableHighAccuracy: true,
    timeout: 10*1000,
    maximumAge: 50*1000
  };


  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  else
    console.log("Geolocation is not supported by this browser.");

}

function success(position) {
  current_lat=position.coords.latitude;
  current_lon=position.coords.longitude;
  console.log("LAT:"+current_lat);
  console.log("LON:"+current_lon);
  var myLatLng = {lat: current_lat, lng: current_lon};

  var map = new google.maps.Map(document.getElementById('googleMapNewStatus'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'La mia posizione'
  });

}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
