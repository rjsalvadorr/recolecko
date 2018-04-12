
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var electronRemote = require('electron').remote;

var FolderManager = require('./foldermanager');
var searchFiles = require('./filesearch');
var Constants = require('./constants');
var constants = new Constants();

var outputTextarea = document.querySelector('#output');




/////  Setup and data loading  /////////////////////////////////////////////////

var path = path || require('path');
var fs = fs || require('fs');
var dataFilePath = constants.DATA_FILE_PATH;

function saveData(appDataObj) {
  fs.writeFileSync(dataFilePath, JSON.stringify(appDataObj, null, 2));
  console.log('Saved data file');
}

function replaceText(textSelector, text) {
  if (text) {
    var outputElement = document.querySelector(textSelector);
    if(outputElement) {
      outputElement.innerHTML = text;
    }
  }
}

function renderData(appData) {
  replaceText('.settings-output--drafts', appData.draftDirectory);
  replaceText('.settings-output--projects', appData.projectsDirectory);
  replaceText('.settings-output--inventory', '');
}

// Create data location if it doesn't exist
var dataLocation = constants.DATA_PATH;
if (!fs.existsSync(dataLocation)) {
  fs.mkdirSync(dataLocation);
  console.log('Created data directory');
}

if (!fs.existsSync(dataFilePath)) {
  var initAppState = {
    draftDirectory: '',
    projectsDirectory: '',
    inventoryDirectory: [],
  }

  saveData(initAppState);
}

var appData = require(constants.DATA_FILE_PATH_NOEXT);
console.log(appData);
renderData(appData);



/////  Utility functions  //////////////////////////////////////////////////////

function bindClickFunction(selector, func) {
  document.querySelector(selector).addEventListener('click', func);
}

function createGenericPrintAction(initialMsg, actionFunc) {
  return createPrintAction('#output', initialMsg, actionFunc, false, null)
}

function createPrintAction(outputSelector, initialMsg, actionFunc, overwrite, actionData) {
  var outputElement = document.querySelector(outputSelector);
  var newFunc = function () {
    var outVal = actionFunc(actionData);
    if (outVal) {
      if (overwrite) {
        outputElement.innerHTML = '';
      }
      outputElement.innerHTML += initialMsg;
      outputElement.innerHTML += outVal + '\n';
    }
  };
  return newFunc;
}




/////  Action Handlers  ////////////////////////////////////////////////////////

function handleNewJamFolder() {
  outputTextarea.innerHTML += 'Creating new jam folder...\n';

  var folderManager = new FolderManager();
  var outVal = folderManager.createNewFolder(appData.draftDirectory);
  outputTextarea.innerHTML += outVal + '\n';
}

function handleNewProjectFolder() {
  outputTextarea.innerHTML += 'Creating new project folder...\n';

  var folderManager = new FolderManager();
  var outVal = folderManager.createNewFolder(appData.projectsDirectory);
  outputTextarea.innerHTML += outVal + '\n';
}

function handleRemoveEmptyProjects() {
  outputTextarea.innerHTML += 'Searching for empty projects...\n';

  var folderManager = new FolderManager();
  var outVal = folderManager.deleteEmptyFolders();
  outputTextarea.innerHTML += outVal + '\n';
}

function handleUpdateInventory() {
  outputTextarea.innerHTML += 'Updating inventory...\n';

  var outVal = searchFiles();
  outVal += 'Inventory updated!';
  outputTextarea.innerHTML += outVal + '\n';
  electronRemote.getCurrentWindow().reload();
}

function handleClearOutput() {
  outputTextarea.innerHTML = '';
}

bindClickFunction('#btnNewJamFolder', handleNewJamFolder);
bindClickFunction('#btnNewProjectFolder', handleNewProjectFolder);
bindClickFunction('#btnRemoveEmptyProjects', handleRemoveEmptyProjects);
bindClickFunction('#btnUpdateInventory', handleUpdateInventory);
bindClickFunction('#btnClearOutput', handleClearOutput);




/////  Settings  ///////////////////////////////////////////////////////////////

function openFolderBrowser(data) {
  const { dialog } = require('electron').remote;

  var inputDirectories = dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  // save data
  appData[data.appDataProp] = inputDirectories[0];
  saveData(appData);

  return inputDirectories[0];
}

var actionFunc = createPrintAction('.settings-output--drafts', '', openFolderBrowser, true, { appDataProp: 'draftDirectory' });
bindClickFunction('#btn-set-drafts-dir', actionFunc);

actionFunc = createPrintAction('.settings-output--projects', '', openFolderBrowser, true, { appDataProp: 'projectsDirectory' });
bindClickFunction('#btn-set-projects-dir', actionFunc);

actionFunc = createPrintAction('.settings-output--inventory', '', openFolderBrowser, true, { appDataProp: 'inventoryDirectory' });
bindClickFunction('#btn-set-inventory-dir', actionFunc);
