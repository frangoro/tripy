/* Personas (Participantes) functions */

/* Show People in the Event */
function showPersonas(eventId) {
	console.log("Entra en showPersonas.");

	// If eventId is not specified then use the current
	if (!eventId && currentEvent) {
		eventId = currentEvent.id;//TODO: eventId no se actualiza :S
		console.log("Using event: " + currentEvent.titulo);
	}

	db.transaction(function(transaction){
		transaction.executeSql("SELECT * FROM persona WHERE id IN (SELECT persona_fk FROM gasto WHERE evento_fk = ?)", [eventId], 
			function(tx, result){
				$("#participantesList").empty();
				for (var i = 0; i < result.rows.length; i++) {
					deuda = deudaByNombre(result.rows.item(i).nombre);
					if (result.rows.item(i).foto) {
						$("#participantesList").append('<li><a href=""><img src="'+result.rows.item(i).foto+'"/>' + result.rows.item(i).nombre + '<p>'+deuda+'</p></a></li>');
					} else {
						$("#participantesList").append('<li><a href=""><img src="img/Unknown-person.gif"/>' + result.rows.item(i).nombre + '<p>'+deuda+'</p></a></li>');
					}
					$("#participantesList").append('<a href="#pageInfoParticipante" data-transition="pop" data-icon="info"></a>');
				}
				$("#participantesList").listview("refresh");
		}, function(error){
			console.log("Error en la consulta de viajes.");
		});
	});
}

/* Add a new person to People in the Event */
function addPersona() {
    var nombre = document.getElementById("newPersona").elements.namedItem("nombre").value;
    var fotoURL = document.getElementById("newPersona").elements.namedItem("foto").files[0];
    var reader = new FileReader();
    var fotoData;
    reader.onloadend = function() {
    	if(reader.error) {
            console.log(reader.error);
        } 
        //else {
    	fotoData = reader.result;
	    addPersonaAux(nombre, fotoData);
		//}
    }
    if (fotoURL) {
		reader.readAsDataURL(fotoURL);
    } else {
      fotoData = null;
      addPersonaAux(nombre, fotoData)
    }
}

function addPersonaAux(nombre, fotoData) {
  db.transaction(function(transaction){
    transaction.executeSql("insert into persona (nombre,foto) values (?,?)", [nombre, fotoData], 
	    function (res) {
	        //TODO: actualización automática: con data bindind o llamando a una función de refresco?
	        showPersonas();
	        document.getElementById("newPersona").reset();
	    },
	    function(error){
	        alert("Error añadiendo persona");
	    });
  })
}

// Busca la deuda de una persona en deudasArray dada una persona
function deudaByNombre(nombrePersona) {
	for (var i = deudasArray.length - 1; i >= 0; i--) {
		if (deudasArray[i].persona == nombrePersona) {
			return deudasArray[i].deuda;
		};
	};
	return 0;
}

