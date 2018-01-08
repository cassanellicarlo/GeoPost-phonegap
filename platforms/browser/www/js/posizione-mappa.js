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

function error(error) {
  console.warn(`ERROR(${error.code}): ${error.message}`);
  var errorMessage;

  switch(error.code) {
    case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");

        $("#status-update").prop("disabled",true); // disabilito il bottone aggiorna stato perché l'utente non ha dato il permesso della posizione.

        errorMessage="<div style='margin-top:20px' class='alert alert-warning alert-dismissible fade show' role='alert'>";
        errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
        errorMessage+="Non hai dato i permessi per la posizione.</div>";
        $("#aggiorna-stato").prepend(errorMessage);
        break;
    case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");

        errorMessage="<div style='margin-top:20px' class='alert alert-warning alert-dismissible fade show' role='alert'>";
        errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
        errorMessage+="Posizione non disponibile.</div>";
        $("#aggiorna-stato").prepend(errorMessage);
        break;
    case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        errorMessage="<div style='margin-top:20px' class='alert alert-warning alert-dismissible fade show' role='alert'>";
        errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
        errorMessage+="Timeout - Posizione non disponibile. Assicurati di aver attivato il GPS.</div>";
        $("#aggiorna-stato").prepend(errorMessage);
        break;
    case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
  }

}
