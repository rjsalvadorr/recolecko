// For various utilities

var DEBUG_MODE = false;
var CRLF = '\r\n';
var path = require('path');
var fs = require('fs');

var Utils = require('./utils');
var utils = new Utils()
var Constants = require('./constants');
var constants = new Constants();

// Filter filenames based on regex
var isMusicFile = function(filename) {
  if(filename.match(constants.MUSIC_FILE_REGEX)) {
      return true;
  }
  return false;
};

// Filter folders based on regex
var isMusicFolder = function(filename) {
  if(filename.match(constants.MUSIC_FOLDER_REGEX)) {
      return true;
  }
  return false;
};

// See https://gist.github.com/kethinov/6658166
// List all files in a directory in Node.js recursively in a synchronous fashion
function searchDirectoriesForFiles(dir, filelist, printFiles) {
  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
          filelist = searchDirectoriesForFiles(path.join(dir, file), filelist, printFiles);
      }
      else {
        if(isMusicFile(file)) {
          filelist.push(file);
          if (printFiles) {
              console.log(file);
          }
        }
      }
  });
  return filelist;
};

function searchDirectories(dir, filelist) {
  // TODO FOR NOW!
  return [];
};

class FolderManager {
    constructor() {
    }

    findEmptyFolders() {
      var directoryList = searchDirectories(constants.ROOT_PATH);
      console.log('[FolderManager] directoryList', directoryList);
      return directoryList;
    }

    deleteEmptyFolders() {
      console.log('Removing empty class folders...');
      var folderList = this.findEmptyFolders();
      // console.log('[FolderManager] folderList', folderList);
      var folderListString = utils.convertListToString(folderList);
      // console.log('[FolderManager] folderListString' + folderListString);
    }
};

module.exports = FolderManager;

//////////

var folderManager = new FolderManager();
folderManager.deleteEmptyFolders();
