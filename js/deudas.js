function deudas() {
  var ul = document.getElementById("deudasList");
  var gastosArray = [], deudasArray = [], auxArray = [], participantesArray = [];
  var totalGastos = 0, mediaGastos = 0, cantidad = "";
  db.executeSql("select * from gasto where importe > 0 order by importe desc", [], 
    function (res) {
      participantesArray = res.rows;
      for (var i = 0; i < participantesArray.length; i++) {
        gastosArray[i] = parseFloat(participantesArray.item(i).importe) || 0.0;
        totalGastos = totalGastos + gastosArray[i];
      }
      mediaGastos = totalGastos / gastosArray.length;
      for (var i = 0; i < participantesArray.length; i++) {
        deudasArray[i] = mediaGastos - gastosArray[i];
      }
      // El array de deudas debe estar ordenado descendentemente para que funcione el algoritmo

      var i = 0;
      var n = deudasArray.length;
      while (i < n) {
        var j = i + 1;
        var di = deudasArray[i]; //Deuda negativa de la persona i-esima
        while (j < n && di < 0) {//Solo toma a las personas que tienen deuda negativa
          var dj = deudasArray[j];//Deuda positiva de la persona j-esima
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
            deudasArray[i] = di;
            deudasArray[j] = dj;
            //Imprime
            var li = document.createElement("LI");
            li.textContent = participantesArray.item(j).persona + " --> " + 
            participantesArray.item(i).persona + " : " + cantidad;
            ul.appendChild(li);
          }
          j++;
        }
        i++;
      }
    }, 
    function(e){console.log(e);
  });    
}