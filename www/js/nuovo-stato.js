function nuovoStato (){
  console.log("I'm inside nuovoStato function");
  var session_id=localStorage.getItem("session_id");
  getPosition();

  $("#status-update").click(function(){
      console.log("click bottone aggiorna stato");

      var messaggio=$("#messaggio").val();
      console.log(messaggio);

      $.ajax({
        url: "https://ewserver.di.unimi.it/mobicomp/geopost/status_update",
        method: "GET",
        data: {
          session_id: session_id,
          message: messaggio,
          lat: current_lat,
          lon: current_lon
        },
        success: function(result){
            console.log("Stato aggiornato!");

            var successMessage="<div style='margin-top:20px' class='alert alert-success alert-dismissible fade show' role='alert'>";
            successMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
            successMessage+="Stato aggiornato!</div>";
            $("#aggiorna-stato").prepend(successMessage);

        },

        error: function (jqXHR, textStatus, errorThrown){
          console.log("Errore!");
          console.log(jqXHR.status);
          console.log(jqXHR.responseText);

          var errorMessage="<div style='margin-top:20px' class='alert alert-danger alert-dismissible fade show' role='alert'>";
          errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
          errorMessage+="Errore! \n"+jqXHR.responseText+"</div>";
          $("#aggiorna-stato").prepend(errorMessage);
        },

      });

    });




}
