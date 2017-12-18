// Calcola la posizione dell'utente ogni minuto
// E chiama le funzioni per ordinare l'array di amici in base alla distanza

function watchPosition(){
  console.log("I'm inside watchPosition function");

  function success(position) {

    var id;

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

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }


  var options = {
    enableHighAccuracy: true,
    timeout: 60*1000,
    maximumAge: 0
  };

  navigator.geolocation.watchPosition(success, error, options);
}
