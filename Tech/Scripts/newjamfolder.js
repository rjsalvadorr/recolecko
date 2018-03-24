// For setting up new folders/structures
var DEBUG_MODE = false;
var TimestampGenerator = require('./timestamp');
var moment = require('moment');
var path = require('path');
var fs = require('fs');

function createNewJamFolderName() {
    // get current date/time
    var ting = moment().format('YYYY-MMM-DD');
    var timestampGen = new TimestampGenerator();
    var folderName = ting + '-' + timestampGen.getTimestampMillisecondsHex();
    return folderName.toLocaleLowerCase();
}

function createNewJamFolder() {
    // create the folder, and add a README to it!
    var targetPath = '../../Jams/' + createNewJamFolderName();
    var targetDir = path.join(__dirname, targetPath);
    if (!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
    }
}

if(DEBUG_MODE) {
    console.log('createNewJamFolderName() ', createNewJamFolderName());
}

createNewJamFolder();
