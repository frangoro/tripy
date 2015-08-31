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
        //app.receivedEvent('deviceready');
        app.openSQLiteDatabase();
        showGastos();
        deudas();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Open database if exist other case create it
    openSQLiteDatabase: function() {
        //db = window.sqlitePlugin.openDatabase({ name: 'tripy.db', createFromLocation:1 }, op);
        db = window.sqlitePlugin.openDatabase({ name: 'tripy2.db' }, app.createTableGasto);
    },
    // Create table Gasto
    createTableGasto: function() {
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
    }
    
};

app.initialize();