"use strict";

function getDateTimeStamp() {
    var date = new Date();
    var dateTimeStamp = date.toISOString();
    return dateTimeStamp;
}

function updateText(elementId, newText) {
    var textboxElement = document.getElementById(elementId);
    var current = textboxElement.innerHTML;
    var listItem = `<li><strong>${getDateTimeStamp()} </strong>${newText}</li>`;
    textboxElement.innerHTML = listItem.concat(current);
}

function log(newText) {
    updateText('log-box', newText)
}

function createDatabase() {
    log (`entering createDatabase`)
    // Declare db instance
    var db = new Dexie("FilesDB");
    // Define Database Schema
    db.version(1).stores({files: "++id,filename,file"});
    db.version(2).stores({files: "++id,date,filename,file"});
    db.open().then(function (db) {
        log ("Found database: " + db.name);
        log ("Database version: " + db.verno);
        db.tables.forEach(function (table) {
            log ("Found table: " + table.name);
            // log ("Table Schema: " + JSON.stringify(table.schema, null, 4));
        });
    }).catch('NoSuchDatabaseError', function(e) {
        // Database with that name did not exist
        log ("Database not found");
    }).catch(function (e) {
        log ("Oh uh: " + e);
    });
    return db;
} 

function listDatabases() {
    log('entering listDatabases');
    Dexie.getDatabaseNames().then((databaseNames) => {
        databaseNames.forEach((databaseName) => {
            log(`Database found: ${databaseName}`);
        });
    });
}

function deleteDatabase(){
    var db = createDatabase();
    db.delete().then(() => {
        log("Database successfully deleted");
    }).catch((err) => {
        log("Could not delete database");
    }).finally(() => {
        // Do what should be done next...
    });
}

function addEntries() {
    log('entering addEntries');
    var db = createDatabase();
    db.files.put({
        date: getDateTimeStamp(),
        filename: 'test file name',
        file: 'placeholder file'
    });
}

function readEntries() {
    log('entering readEntries');
}

function deleteEntries() {
    log('entering deleteEntries');
    var result = Dexie.deleteDatabase('FilesDB');
    log(`Dexie delete result: ${result}`)
}

