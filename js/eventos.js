/* Eventos (Eventos) functions */

function showEventos() {
	db.transaction(function(transaction){
		transaction.executeSql("SELECT * FROM evento", [], 
			function(tx, result){
				$("#eventosList").empty();
				for (var i = 0; i < result.rows.length; i++){
					var item = result.rows.item(i);
					$("#eventosList").append('<li><a href="">' + item.titulo + '</a></li>').append(
						'<a href="#pageInfoEvento" data-transition="pop" data-icon="info"></a>');
				}
				$("#eventosList").listview("refresh");
		}, function(error){
			console.log("Error en la consulta de eventos.");
		});
	});
}

function addEvento() {
    var titulo = document.getElementById("newEvento").elements.namedItem("titulo").value;
    var lugar = document.getElementById("newEvento").elements.namedItem("lugar").value;
    var fechaInicio = new Date();
    var fechaFin = null;
    var presupuestoInicio = +document.getElementById("newEvento").elements.namedItem("presupuestoInicio").value;
    var presupuestoFin = +document.getElementById("newEvento").elements.namedItem("presupuestoFin").value;
    var foto = null;
    db.executeSql("INSERT INTO evento (titulo, foto, lugar, fecha_inicio, fecha_fin, presupuesto_inicio, presupuesto_fin) " +
    	"VALUES (?, ?, ?, ?, ?, ?, ?)", [titulo, lugar, foto, fechaInicio, fechaFin, presupuestoInicio, presupuestoFin], 
    function (res) {
        showEventos();
        $("newEvento").reset();
    },
    function(error){
    	console.log("Error añadiendo el evento con título: " + titulo + ". Debido a: " + error.message);
        alert("Error añadiendo el evento con título: " + titulo);
    });
}

function setCurrentEvent(currentEventId) {
    db.transaction(function(transaction){
        transaction.executeSql("SELECT DISTINCT * FROM evento WHERE id = ?", [currentEventId], 
            function(tx, result){
                if(result.rows.length == 0) {
                    // Go to page events because create at least one event is needed
                    currentEvent = null;
                    $.mobile.changePage("#pageEventos", {
                       transition: 'slide'
                    });
                    return -1;
                }
                currentEvent = result.rows.item(0);
            },
            function(error){
                console.log("Error setting default event.");
            });
    });
}