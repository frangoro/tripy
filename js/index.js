/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /* Global vars */
// Global var for data base object
var db = null;
// Variable global que lleva las deudas y las personas
var deudasArray = [];
// Global var for double backbutton in less than one second
var dblBackButton = 0;
// Current active event
var currentEvent = null;

var app = {
    // SQLite database instance
    db: null,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.openSQLiteDatabase();
        document.addEventListener("backbutton", handleBackButton, false);
    },
    // Open database if exist other case create it
    openSQLiteDatabase: function() {
        db = window.sqlitePlugin.openDatabase({ name: 'tripy.db', createFromLocation:1 }, function() {
            /*$("body").pagecontainer("load", "personas.html#pagePersonas", { transition: 'flip',
            changeHash: false,
            reverse: true,
            showLoadMsg: true 
            });*/
            deudas();
            showPersonas();
            setCurrentEvent(1); // Set default event
            $("#pageGastos").on("pageshow", function() {
                //alert('Cambia a pageGastos');
                showGastos();
            });
            $("#pagePersonas").on("pageshow", function() {
                //alert('Cambia a pagePersonas');
                showPersonas();
            });
            $("#pageDeudas").on("pageshow", function() {
                deudas();
            });
            $("#pageEventos").on("pageshow", function() {
                showEventos();
            });
            // Desplaza a la página de la derecha
            $(window).on("swipeleft",function(){
                //$(this).pagecontainer("getActivePage");
                if ($.mobile.activePage.next('[data-role=page]').length != 0) {
                    var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
                    $.mobile.changePage(next, {
                       transition: 'slide'
                    });
                }
            });
            $(window).on("swiperight",function(){
                //$(this).pagecontainer("getActivePage");
                if ($.mobile.activePage.prev('[data-role=page]').length != 0) {
                    var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
                    $.mobile.changePage(prev, {
                       transition: 'slide'
                    });
                }
            }); 
        });
        //showPersonas();
        //db = window.sqlitePlugin.openDatabase({ name: 'tripy2.db' }, app.createTables);
    }
    //TODO: Borrar cuando pueda asegurar que funciona bien usar una bd existente (despues de probar instalar archivo apk en un móvil)
    /*,
    // Create table Gasto
    createTables: function() {
        db.transaction(function(transaction) {
            transaction.executeSql('CREATE ' +
                       'TABLE IF NOT EXISTS ' +
                       'gasto (id integer primary key, concepto varchar(20), importe INTEGER, persona varchar(10), fecha DATE)', [],
                function(tx, result) {
                    console.log("Table Gasto created successfully.");
                }, 
                function(error) {
                      console.log("Error occurred while creating the table Gasto.");
                });
            });
        db.transaction(function(transaction) {
            transaction.executeSql('CREATE ' +
                       'TABLE IF NOT EXISTS ' +
                       'persona (id integer primary key, nombre TEXT, foto BLOB)', [],
                function(tx, result) {
                    console.log("Table persona created successfully.");
                }, 
                function(error) {
                      console.log("Error occurred while creating the table persona.");
                });
            });
    }*/
};

/*document.addEventListener("onload", function() {
    app.initialize();
    alert('DOM loaded');
}, false);

document.onload = function() {
    console.log('entra onload');
    app.initialize();
    console.log('sale onload');
}*/

$(document).on("mobileinit",function() {
    $.mobile.autoInitializePage = false;
});

$(document).ready(function(){
    window.location.hash = 'pagePersonas';
    $.mobile.initializePage();
    console.log('entra onload');
    app.initialize();
    console.log('sale onload');
});