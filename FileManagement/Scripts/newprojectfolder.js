// For setting up new folders/structures
var DEBUG_MODE = false;
var moment = require('moment');
var path = require('path');
var fs = require('fs');
var Sentencer = require('sentencer');

var TimestampGenerator = require('./timestamp');
var Utils = require('./utils');

function createNewProjectFolderName(timestamp) {
    var randomAdj = Sentencer.make('{{ adjective }}');
    var folderName = timestamp + '-' + randomAdj;
    return folderName;
}

function createNewProjectFolder() {
    // create the folder!
    // use a custom timestamp, and use that to name the folder
    var timestampGen = new TimestampGenerator();
    var timestamp = timestampGen.getProjectTimestamp();
    var projName = createNewProjectFolderName(timestamp)
    var targetPath = '../../Projects/' + projName;
    var targetDir = path.join(__dirname, targetPath);

    if (!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
        console.log('Created \'Projects/' + projName + '\'');
    }

    // create the readme template
    var utils = new Utils();
    var defaultMarkdownContent = utils.getMarkdownFileContents(false, projName);
    var filename = timestamp + '.md'
    fs.writeFile(path.join(targetDir, filename), defaultMarkdownContent, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

if(DEBUG_MODE) {
    var timestamp = 'TEST_TIMESTAMP';
    console.log('createNewProjectFolderName(timestamp) ', createNewProjectFolderName(timestamp));
}

createNewProjectFolder();
