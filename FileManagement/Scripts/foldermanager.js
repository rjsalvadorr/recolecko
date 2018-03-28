// For various utilities

var DEBUG_MODE = false;
var CRLF = '\r\n';
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');

var Utils = require('./utils');
var utils = new Utils()
var Constants = require('./constants');
var constants = new Constants();

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

class FolderManager {
    constructor() {
    }

    isDirectoryEmpty(path) {
      var dirContent = fs.readdirSync(path);
      var pathElements = path.replace(/\\\/$/, '').split(/[\\\/]/);
      var dirName = pathElements[pathElements.length - 1];
      var mdName = dirName + '.md';

      // If the only file in that folder is a markdown file of the same name,
      // this is VERY LIKELY a generated file. And counts as "empty" for us.
      if(dirContent.length === 1 && dirContent[0] === mdName) {
        return true;
      }
      return false;
    }

    // Filter folders based on regex
    isMusicFolder(filename) {
      if(filename.match(constants.MUSIC_FOLDER_REGEX)) {
          return true;
      }
      return false;
    };

    findEmptyFolders() {
      var directoryList = getDirectoriesRecursive(constants.ROOT_PATH);
      var targetList = [];
      var currentDir = '';
      var isMarkedForDeletion = false;
      for (var i = 0; i < directoryList.length; i++) {
        currentDir = directoryList[i];
        isMarkedForDeletion = this.isMusicFolder(currentDir) && this.isDirectoryEmpty(currentDir)
        if(isMarkedForDeletion) {
          targetList.push(currentDir);
        }
      }
      return targetList;
    }

    deleteEmptyFolders() {
      var folderList = this.findEmptyFolders();
      var currentFolder = '';
      if(folderList.length === 0) {
        console.log('No empty folders detected\n');
      }
      for (var i = 0; i < folderList.length; i++) {
        console.log('Deleting ' + folderList[i]);
        rimraf(folderList[i], function(err) {
          if(err) {
            console.log('Folder deletion failed. See:');
            console.log(err);
          }
        });
      }
      if(folderList.length > 0) {
        console.log('Empty folders deleted!\n');
      }
    }
};

module.exports = FolderManager;

//////////

var folderManager = new FolderManager();
folderManager.deleteEmptyFolders();
