// For setting up new folders/structures
var DEBUG_MODE = false;
var moment = require('moment');
var path = require('path');
var fs = require('fs');
var Sentencer = require('sentencer');
var TimestampGenerator = require('./timestamp');

function createNewJamFolderName() {
    // get current date/time
    var timestampGen = new TimestampGenerator();
    var timestamp = timestampGen.getProjectTimestamp();
    var date = timestampGen.getSimpleDate();
    var folderName = date + '-' + timestamp;
    return folderName;
}

function createNewJamFolder() {
    // create the folder, and add a README to it!
    var jamName = createNewJamFolderName();
    var targetPath = '../../Jams/' + jamName;
    var targetDir = path.join(__dirname, targetPath);
    if (!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
        console.log('Created \'Jams/' + jamName + '\'');
    }
}

if(DEBUG_MODE) {
    console.log('createNewJamFolderName() ', createNewJamFolderName());
}

createNewJamFolder();
