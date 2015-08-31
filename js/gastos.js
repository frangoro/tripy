/* Management of Gastos */

function addGasto() {
    var concepto = document.getElementById("newGasto").elements.namedItem("concepto").value;
    var importe = document.getElementById("newGasto").elements.namedItem("importe").value;
    var persona = document.getElementById("newGasto").elements.namedItem("persona").value;
    var fecha = Date();
    db.executeSql("insert into gasto (concepto, importe, persona, fecha) values (?, ?, ?, ?)", [concepto, importe, persona, fecha], 
    function (res) {
        //TODO: actualización automática: con data bindind o llamando a una función de refresco?
        showGastos();
        clearFormGasto();
    },
    function(error){
        alert("Error añadiendo el gasto con concepto: " + concepto);
    });
}

//TODO: Modificar el registro con id = id. Ver como recoger los campos.
function modifyGasto(id) {
    var concepto = document.getElementById("newGasto").elements.namedItem("concepto").value;
    var importe = document.getElementById("newGasto").elements.namedItem("importe").value;
    var persona = document.getElementById("newGasto").elements.namedItem("persona").value;
    var fecha = Date(); //TODO: Debe ser la fecha en que se produce el pago
    db.transaction(
        function(transaction) {
        // Define update query
        var executeQuery = "UPDATE " +
                           "gasto " +
                           "SET concepto = ?  WHERE  id =?"; 
        transaction.executeSql(executeQuery, [concepto, importe, persona, fecha, id]
            , function(tx, result) {   // On success
                 console.log('Gasto updated successfully.');
            },
            function(error){     // On error                               
                console.log('Error occurred while updating the gasto.'); 
            });
   });
}

function removeGasto(id) {
    db.transaction(
        function(transaction) {
        // Define update query
        var executeQuery = "DELETE FROM " +
                           "gasto " +
                           "WHERE  id =?"; 
        transaction.executeSql(executeQuery, [id]
            , function(tx, result) {   // On success
                 console.log('Gasto deleted successfully.');
            },
            function(error){     // On error                               
                console.log('Error occurred while deleting the gasto.'); 
            });
       });  
}

function viewGasto(id) {
   db.transaction(function(transaction) {
        transaction.executeSql("SELECT * FROM Business_Table WHERE id =?", [id],
        function(tx, result) {
            //TODO: Abre el gasto para poder verlo
            console.log("Gasto encontrado");
          }, 
          function(error) {
                console.log("Error occurred while view gasto.");
          });
  }); 
}

function clearFormGasto() {
    document.getElementById("newGasto").reset();
}

// Retrieve information from SQLite database to populate 
// the application tables
function showGastos() {
    var importeMinimo = 0;
    // Clean table
    var table = document.getElementById("myTable");
    for (var i = 1; i < table.rows.length; i++) {
        table.deleteRow(i);
    }
    // Retrieve rows and put it in the table
    db.executeSql("select * from gasto where importe > ?", [importeMinimo], function (res) {
        for (var i = 0; i < res.rows.length; i++) {
            var concepto = res.rows.item(i).concepto;
            var importe = res.rows.item(i).importe;
            var persona = res.rows.item(i).persona;
            var fecha = res.rows.item(i).fecha;
            console.log('Concepto: ' + concepto);
            console.log('importe: ' + importe);
            console.log('persona: ' + persona);
            console.log('fecha: ' + fecha);
            var row = table.insertRow();
            row.insertCell(0).innerHTML= concepto;
            row.insertCell(1).innerHTML= importe;
            row.insertCell(2).innerHTML= persona;
            row.insertCell(3).innerHTML= fecha;
        }
    });
}