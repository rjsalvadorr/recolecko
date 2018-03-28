
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var Utils = require('./tools/utils');
var FolderManager = require('./tools/foldermanager');
var searchFiles = require('./tools/filesearch');

var outputTextarea = document.querySelector('#output');

function bindClickFunction(selector, func) {
  document.querySelector(selector).addEventListener('click', func);
}

function handleNewJamFolder() {
  var folderManager = new FolderManager();
  var outVal = folderManager.createNewFolder(true);
  outputTextarea.innerHTML += outVal + '\n';
}

function handleNewProjectFolder() {
  var folderManager = new FolderManager();
  var outVal = folderManager.createNewFolder(false);
  outputTextarea.innerHTML += outVal + '\n';
}

function handleRemoveEmptyProjects() {
  var folderManager = new FolderManager();
  var outVal = folderManager.deleteEmptyFolders();
  outputTextarea.innerHTML += outVal + '\n';
}

function handleUpdateInventory() {
  var outVal = searchFiles();
  outVal += 'Inventory updated!';
  outputTextarea.innerHTML += outVal + '\n';
}

function handleClearOutput() {
  outputTextarea.innerHTML = '';
}

bindClickFunction('#btnNewJamFolder', handleNewJamFolder);
bindClickFunction('#btnNewProjectFolder', handleNewProjectFolder);
bindClickFunction('#btnRemoveEmptyProjects', handleRemoveEmptyProjects);
bindClickFunction('#btnUpdateInventory', handleUpdateInventory);
bindClickFunction('#btnClearOutput', handleClearOutput);
