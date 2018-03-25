// For setting up new folders/structures
var DEBUG_MODE = false;
var moment = require('moment');
var path = require('path');
var fs = require('fs');
var Sentencer = require('sentencer');
var TimestampGenerator = require('./timestamp');

function createNewProjectFolderName() {
    // get a custom timestamp
    var timestampGen = new TimestampGenerator();
    var timestamp = timestampGen.getProjectTimestamp();
    var randomAdj = Sentencer.make('{{ adjective }}');
    var folderName = timestamp + '-' + randomAdj;
    return folderName;
}

function createNewProjectFolder() {
    // create the folder!
    var projName = createNewProjectFolderName()
    var targetPath = '../../Projects/' + projName;
    var targetDir = path.join(__dirname, targetPath);
    if (!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
        console.log('Created \'Projects/' + projName + '\'');
    }
}

if(DEBUG_MODE) {
    console.log('createNewProjectFolderName() ', createNewProjectFolderName());
}

createNewProjectFolder();
