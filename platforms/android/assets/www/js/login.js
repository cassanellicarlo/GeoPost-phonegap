function login (){

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

          $("#navigation").show(); // mostro la navbar

          // Dopo il login, carico la pagina degli amici (con lista e mappa)
          $("#page").load("amici.html",function (){
            scaricaAmici();
          });

          // Click su Amici dal menu
          $("#amici").click(function(){
            console.log("Cliccato bottone Amici");
            navigator.geolocation.clearWatch(id);
            $("#page").load("amici.html");
            scaricaAmici();
          });

          // Click su Nuovo Amico dal menu
          $("#nuovo_amico").click(function(){
            console.log("Cliccato bottone nuovo amico");
            navigator.geolocation.clearWatch(id);
            $("#page").load("nuovo-amico.html",function (){
              nuovoAmico();
            });
          });

          // Click su Nuovo Stato dal menu
          $("#nuovo_stato").click(function(){
            console.log("Cliccato bottone nuovo stato");
            navigator.geolocation.clearWatch(id);
            $("#page").load("nuovo-stato.html",function (){
              nuovoStato();
            });
          });

          // Click su Profilo dal menu
          $("#profilo").click(function(){
            console.log("Cliccato bottone profilo");
            navigator.geolocation.clearWatch(id);
            $("#page").load("profilo.html",function (){
              profilo();
            });
          });

        } // else
      }, //success

      error: function (jqXHR, textStatus, errorThrown){
        console.log("Errore!");
        console.log(jqXHR.status);
        console.log(jqXHR.responseText);


        var errorMessage="<div style='margin-top:20px' class='alert alert-danger alert-dismissible fade show' role='alert'>";
        errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
        errorMessage+=jqXHR.responseText+"</div>";
        $("#messaggio").html(errorMessage);


      },

    });
  });
}
