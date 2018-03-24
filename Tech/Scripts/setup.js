// For setting up new folders/structures
var DEBUG_MODE = true;
var TimestampGenerator = require('./timestamp');
var moment = require('moment');

function createNewJamFolderName() {
    // get current date/time
    var ting = moment().format('YYYY-MMM-DD');
    var timestampGen = new TimestampGenerator();
    var folderName = ting + '-' + timestampGen.getTimestampMillisecondsHex();
    return folderName.toLocaleLowerCase();
}

function createNewJamFolder() {
    return 0;
}

if(DEBUG_MODE) {
    console.log('createNewJamFolderName() ', createNewJamFolderName());
}
