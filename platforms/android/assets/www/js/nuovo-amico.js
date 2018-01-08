
function nuovoAmico (){
  console.log("I'm inside nuovoAmico function");

  var session_id=localStorage.getItem("session_id");

  $("#parametro").on("input",function(){
    console.log("valore cambiato!");
    var parametro=$("#parametro").val();
    console.log(parametro);

    $.ajax({
      url: "https://ewserver.di.unimi.it/mobicomp/geopost/users",
      method: "GET",
      data: {
        usernamestart: parametro,
        session_id: session_id,
        limit: 10
      },
      success: function(result){
        console.log(result);
        console.log(result.usernames);
        var elenco="<ul class='list-group'>";
        var utenti=result.usernames;
        for(var i=0;i<utenti.length;i++){
          var nome=utenti[i];
          elenco+="<li class='list-group-item justify-content-between'>"+nome;
          elenco+="<span class='float-right'><button class='btn btn-primary btn-sm newfriend' id='"+nome+"'>+</button></span>";
          elenco+="</li>";
        }
        elenco+="</ul>";
        $("#utenti").html(elenco);


        // Quando viene cliccato un qualsiasi bottone + (Aggiungi amico)
        $(".newfriend").click(function(){
          console.log("cliccato bottone + aggiungi amico");
          var user=this.id;
          console.log(user);

          // chiamata per seguire un amico
          $.ajax({
            url: "https://ewserver.di.unimi.it/mobicomp/geopost/follow",
            method: "GET",
            data: {
              username: user,
              session_id: session_id
            },
            success: function(result){
                console.log("Amico seguito!");
                var successMessage="<div style='margin-top:20px' class='alert alert-success alert-dismissible fade show' role='alert'>";
                successMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
                successMessage+="Amico seguito!</div>";
                $("#utenti").prepend(successMessage);
            },

            error: function (jqXHR, textStatus, errorThrown){
              console.log("Errore!");
              console.log(jqXHR.status);
              console.log(jqXHR.responseText);

              var errore;
              if(jqXHR.responseText=="CANNOT FOLLOW YOURSELF") errore="Non puoi seguire te stesso!";
              else if (jqXHR.responseText=="ALREADY FOLLOWING USER") errore="Stai già seguendo questo amico!";
              else if(jqXHR.responseText=="USERNAME NOT FOUND") errore="Username non trovato!";

              var errorMessage="<div style='margin-top:20px' class='alert alert-danger alert-dismissible fade show' role='alert'>";
              errorMessage+="<button type='button' class='close' data-dismiss='alert' aria-label='close'> <span aria-hidden='true'>&times;</span> </button>";
              errorMessage+="Errore! \n"+errore+"</div>";
              $("#utenti").prepend(errorMessage);
            },

          });

        });

      }

    });
  });

}
