"use strict";

console.log("Entering, and exiting!, a template scripts.js file");

function addList() {
    var element = document.getElementById('textbox');
    element.innerHTML = '<ul id=\'list\'><li>entering addList...</li></ul>';
}

function addText(text) {
    let element = document.getElementById('list');
    element.innerHTML += `<li>${text}...</li>`;
}

const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  // Handle errors.
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
  };
};

addList();
addText('calling addText');
openDatabase();

// inspiration https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB