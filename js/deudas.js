//TODO: Hay que hacer un group by persona para poder usar bien esta función
function deudas() {
  $("#deudasList").empty();
  var auxArray = [], participantesArray = [];
  var totalGastos = 0, mediaGastos = 0, cantidad = "", importePago;
  db.executeSql("select gasto.id, gasto.concepto, sum(gasto.importe) as importe, persona.nombre as persona, gasto.fecha " +
    "from persona, evento, gasto where persona.id = gasto.persona_fk and evento.id = gasto.evento_fk " +
    "group by gasto.persona_fk having importe > 0 order by importe desc", [], 
    function (res) {
      participantesArray = res.rows;
      // Calcula el total y la media de los importes pagados
      for (var i = 0; i < participantesArray.length; i++) {
        importePago = parseFloat(participantesArray.item(i).importe) || 0.0;
        totalGastos = totalGastos + importePago;
      }
      mediaGastos = totalGastos / participantesArray.length;
      // Calcula la deuda individual
      for (var i = 0; i < participantesArray.length; i++) {
        deudasArray[i] = {deuda: mediaGastos - parseFloat(participantesArray.item(i).importe) || 0.0,
        persona: participantesArray.item(i).persona};
      }
      var deudasArrayAux = $.extend(true,[],deudasArray);
      // El array de deudas debe estar ordenado descendentemente para que funcione el algoritmo

      var i = 0;
      var n = deudasArrayAux.length;
      while (i < n) {
        var j = i + 1;
        var di = deudasArrayAux[i].deuda; //Deuda negativa de la persona i-esima
        while (j < n && di < 0) {//Solo toma a las personas que tienen deuda negativa
          var dj = deudasArrayAux[j].deuda;//Deuda positiva de la persona j-esima
          if (dj > 0) { //Solo toma a las personas que tienen deuda positiva
            var d = di + dj;//Lo que queda por pagarle a la persona i después de que le j le haya pagado
            // Calcula la cantidad a pagar por la persona j a la persona i
            if (d == 0) {
              cantidad = Math.abs(dj);
              di = 0;
              dj = 0;
            }
            else if (d > 0) {
              cantidad = Math.abs(dj + di);
              dj = di + dj;
              di = 0;
            }
            else {
              cantidad = Math.abs(dj);
              di = di + dj;
              dj = 0;
            }
            //Actualiza valores del array de deudas
            deudasArrayAux[i].deuda = di;
            deudasArrayAux[j].deuda = dj;
            //Imprime
            $("#deudasList").append('<li>'+ deudasArrayAux[j].persona + " --> " 
              + deudasArrayAux[i].persona + " : " + cantidad + '</li>');
          }
          j++;
        }
        i++;
      }
      $("#deudasList").listview("refresh");
    }, 
    function(e){
      console.log(e);
  });    
}

$("#pageDeudas").on("pageshow", function() {
    deudas();
});