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
      //console.log(friend_list);

      mappaAmici();

      }


    });



}
