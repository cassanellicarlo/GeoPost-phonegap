// Calcola la posizione dell'utente ogni minuto
// E chiama le funzioni per ordinare l'array di amici in base alla distanza

function watchPosition(){
  console.log("I'm inside watchPosition function");

  function success(position) {

    console.log('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');

    current_lat=position.coords.latitude;
    current_lon=position.coords.longitude;

    friend_list.calculateAllDistances();
    friend_list.sortByDistance();
    friend_list.createList();
  }

  function error(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
    var errorMessage;

    switch(error.code) {
      case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");

          errorMessage="<div style='margin-top:20px' class='alert alert-warning alert-dismissible fade show' role='alert'>";
          errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
          errorMessage+="Non hai dato i permessi per la posizione.</div>";
          $("#page").prepend(errorMessage);
          break;
      case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");

          errorMessage="<div style='margin-top:20px' class='alert alert-warning alert-dismissible fade show' role='alert'>";
          errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
          errorMessage+="Posizione non disponibile.</div>";
          $("#page").prepend(errorMessage);
          break;
      case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          errorMessage="<div style='margin-top:20px' class='alert alert-warning alert-dismissible fade show' role='alert'>";
          errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
          errorMessage+="Timeout - Posizione non disponibile. Assicurati di aver attivato il GPS.</div>";
          $("#page").prepend(errorMessage);
          break;
      case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
    }
  }


  var options = {
    enableHighAccuracy: true,
    timeout: 10*1000,
    maximumAge: 50*1000
  };

  id=navigator.geolocation.watchPosition(success, error, options);
}
