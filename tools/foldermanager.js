// For various utilities

var DEBUG_MODE = false;
var CRLF = '\r\n';
var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var Sentencer = require('sentencer');

var Utils = require('./utils');
var utils = new Utils()
var Constants = require('./constants');
var constants = new Constants();
var TimestampGenerator = require('./timestamp');

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

    createNewProjectFolderName(timestamp) {
      var randomAdj = Sentencer.make('{{ adjective }}');
      var folderName = timestamp + '-' + randomAdj;
      return folderName;
    }

    createNewFolder(targetDir) {
      if(!targetDir) {
        return 'Folder creation failed. Invalid directory path.';
      }
      
      // create the folder!
      // use a custom timestamp, and use that to name the folder
      var timestampGen = new TimestampGenerator();
      var timestamp = timestampGen.getProjectTimestamp();
      var projName = this.createNewProjectFolderName(timestamp);
      var projDir = path.join(targetDir, projName);
      var outString = '';

      if (!fs.existsSync(projDir)){
          fs.mkdirSync(projDir);
          console.log('Created \'' + projDir + '\'');
          outString += 'Created \'' + projDir + '\'';
      }

      // create the readme template
      var utils = new Utils();
      var defaultMarkdownContent = utils.getMarkdownFileContents(projName);
      var filename = projName + '.md'
      fs.writeFile(path.join(projDir, filename), defaultMarkdownContent, function(err) {
          if(err) {
              console.log(err);
              return err;
          }
      });
      return outString;
    }

    isDirectoryEmpty(path) {
      var dirContent = fs.readdirSync(path);
      var pathElements = path.replace(/\\\/$/, '').split(/[\\\/]/);
      var dirName = pathElements[pathElements.length - 1];
      var mdName = dirName + '.md';

      // If the only file in that folder is a markdown file of the same name,
      // this is VERY VERY LIKELY a generated file. Which counts as "empty" for us.
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
      var directoryList = getDirectoriesRecursive(constants.APP_ROOT_PATH);
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
      var outString = '';

      if(folderList.length === 0) {
        outString = 'No empty folders detected\n';
        console.log(outString);
        return outString;
      }

      for (var i = 0; i < folderList.length; i++) {
        console.log('Deleting ' + folderList[i]);
        outString += 'Deleting ' + folderList[i] + '\n';
        rimraf(folderList[i], function(err) {
          if(err) {
            console.log('Folder deletion failed. See:');
            console.log(err);
            outString += 'Folder deletion failed. See:\n';
            outString += JSON.stringify(err);
          }
        });
      }
      if(folderList.length > 0) {
        console.log('Empty folders deleted!\n');
        outString += 'Empty folders deleted!\n';
      }
      return outString;
    }
};

module.exports = FolderManager;
