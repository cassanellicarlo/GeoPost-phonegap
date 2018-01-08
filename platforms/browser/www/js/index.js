// geolocation
var id;


var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.onLoad, false);
    },

    onDeviceReady: function() {
        console.log("Device ready!");

        $("#page").load("login.html",function (){
          login();
        });

    },


};


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
