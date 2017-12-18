// genera la lista degli amici
function listaAmici (){

  console.log("I'm inside listaAmici function");
  // prendo la posizione dell'utente
  watchPosition();

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


    friend_list.createList();
}
