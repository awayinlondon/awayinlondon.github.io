"use strict";

console.log("Entering, and exiting!, a template scripts.js file");

function updateText(elementId, newText) {
    var textboxElement = document.getElementById(elementId);
    var current = textboxElement.innerHTML;
    var listItem = `<li><strong>Filename: </strong>${newText}</li>`;
    textboxElement.innerHTML = current.concat(listItem);
}


const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    let elementId = 'file-list';
    const fileList = event.target.files;
    console.log(fileList);
    let sFilename = fileList[0].name;
    updateText(elementId, sFilename)

});

let dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}

function uploadFile(file) {
    let elementId = "file-list";
    console.log(file);
    sFilename = file.name;
    updateText(elementId, sFilename)
}


