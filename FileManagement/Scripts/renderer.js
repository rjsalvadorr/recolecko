
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var Utils = require('./tools/utils');
var FolderManager = require('./tools/foldermanager');

var outputTextarea = document.querySelector('#output');

function bindClickFunction(selector, func) {
  document.querySelector(selector).addEventListener('click', func);
}

function handleNewJamFolder() {
  var outVal = 'handleNewJamFolder()';
  outputTextarea.innerHTML = outVal;
}

function handleNewProjectFolder() {
  var outVal = 'handleNewProjectFolder()';
  outputTextarea.innerHTML = outVal;
}

function handleRemoveEmptyProjects() {
  var folderManager = new FolderManager();
  var outVal = folderManager.deleteEmptyFolders();
  outputTextarea.innerHTML = outVal;
}

function handleUpdateInventory() {
  var outVal = 'handleUpdateInventory()';
  outputTextarea.innerHTML = outVal;
}

bindClickFunction('#btnNewJamFolder', handleNewJamFolder);
bindClickFunction('#btnNewProjectFolder', handleNewProjectFolder);
bindClickFunction('#btnRemoveEmptyProjects', handleRemoveEmptyProjects);
bindClickFunction('#btnUpdateInventory', handleUpdateInventory);
