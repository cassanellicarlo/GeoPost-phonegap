
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.onLoad, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("Device ready!");

        $("#login").click(function(){
          console.log("Cliccato bottone login!");
          var username=$("#username").val();
          var password=$("#password").val();
          console.log(username);
          console.log(password);

          $.ajax({
            url: "https://ewserver.di.unimi.it/mobicomp/geopost/login",
            method: "POST",
            data: {
              username: username,
              password: password
            },
            success: function(result){
              console.log(result);
              if(result==""){
                $("#messaggio").html("<div class='alert alert-danger' role='alert'>Dati errati!</div>");
              }

              else{
                localStorage.setItem("session_id", result); // scrivo il session_id nel local storage

                $("#navigation").show()
                $("#page").load("amici.html");

                scaricaAmici();

              }
            }

          });
        });

    },


};

app.initialize();

// Creo la classe Friend
function Friend (username, msg, lat, lon){
  this.username=username;
  this.msg=msg;
  this.lat=lat;
  this.lon=lon;
  this.distance="";
}

// Calcola la distanza dalla posizione dell'utente a quella dell'amico
Friend.prototype.calculateDistance = function (){
  var lat1=current_lat;
  var lon1=current_lon;
  var lat2=this.lat;
  var lon2=this.lon;

  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  // distanza in metri
  this.distance= parseInt( (12742 * Math.asin(Math.sqrt(a)) )*1000 ) ; // 2 * R; R = 6371 km

}

// Creo la classe FriendList
function FriendList (){
  this.friendList=[];
}

// Aggiunge un amico all'array
FriendList.prototype.addFriend = function (friend){
  this.friendList.push(friend);
}

// Clear array
FriendList.prototype.clear = function (){
  this.friendList=[];
}

// Get array
FriendList.prototype.getFriends = function (){
  return this.friendList;
}

// Chiama la funzione calculateDistance() per ogni elemento dell'array
FriendList.prototype.calculateAllDistances = function (){
  for(var i=0;i<this.friendList.length;i++){
    this.friendList[i].calculateDistance();
  }
}

// Riordina l'array in base alla distanza
FriendList.prototype.sortByDistance = function (lat,lon){
  this.friendList.sort(function(a, b) {
    return a.distance - b.distance;
});
}

// Mostra la lista degli amici
FriendList.prototype.createList = function (){
  var elenco="<div class='list-group'>";

  for(var i=0;i<this.friendList.length;i++){
    elenco+="<a href='#' class='list-group-item list-group-item-action flex-column align-items-start'>";
    elenco+="<div class='d-flex w-100 justify-content-between'>";
    elenco+="<h5 class='mb-1'>"+this.friendList[i].username+"</h5>";
    elenco+="<small>"+this.friendList[i].distance +"m</small></div>"
    elenco+="<p class='mb-1'>"+this.friendList[i].msg+"</p></a>";
  }
  elenco+="</div>";
  $("#lista-amici").html(elenco);
}

// inizializzazione lista amici seguiti
var friend_list = new FriendList ();

// dichiarazione latitudine - longitudine corrente
var current_lat;
var current_lon;

// scarica gli amici seguiti dal server
function scaricaAmici (){
  var session_id=localStorage.getItem("session_id");

  friend_list.clear();
  var friend;

    $.ajax({
      url: "https://ewserver.di.unimi.it/mobicomp/geopost/followed",
      method: "GET",
      data: {
        session_id: session_id,
      },
      success: function(result){

      var utenti=result.followed;

        for(var i=0;i<utenti.length;i++){
          if(utenti[i].lat!=null && utenti[i].lon!=null ){
            friend=new Friend(utenti[i].username,utenti[i].msg,utenti[i].lat,utenti[i].lon);
            friend_list.addFriend(friend);
          }

        }

      console.log("I'm inside scaricaAmici function");
      console.log(friend_list);

      mappaAmici();

      }


    });



}

// genera la lista degli amici
function listaAmici (){

  // al click del bottone Mappa
  $("#mostraMappa").click(function(){
      console.log("click bottone mappa");
      $("#lista-amici").hide();
      $("#googleMap").show();
      $("#mostraMappa").removeClass("btn btn-secondary");
      $("#mostraMappa").addClass("btn btn-primary");
      $("#mostraLista").removeClass("btn btn-primary");
      $("#mostraLista").addClass("btn btn-secondary");

      mappaAmici();
    });

    console.log("I'm inside listaAmici function");

    // prendo la posizione dell'utente
    getPosition();

    friend_list.createList();
}

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
      listaAmici()
    });

    var bounds = new google.maps.LatLngBounds(); //create empty LatLngBounds object
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


    for(var i=0;i<friend_list.getFriends().length;i++){
      console.log(friend_list.getFriends()[i]);
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

function getPosition(){


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

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }


  var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  navigator.geolocation.watchPosition(success, error, options);
}
