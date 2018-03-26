// For setting up new folders/structures
var DEBUG_MODE = false;
var moment = require('moment');
var path = require('path');
var fs = require('fs');
var Sentencer = require('sentencer');

var TimestampGenerator = require('./timestamp');
var Utils = require('./utils');

function createNewJamFolderName(timestamp) {
    // get current date/time
    var timestampGen = new TimestampGenerator();
    var randomAdj = Sentencer.make('{{ adjective }}');
    var date = timestampGen.getSimplerDate().toLowerCase();
    var folderName = timestamp + '-' + randomAdj + '-' + date;
    return folderName;
}

function createNewJamFolder() {
    // create the folder, and add a README to it!
    var timestampGen = new TimestampGenerator();
    var timestamp = timestampGen.getProjectTimestamp();
    var jamName = createNewJamFolderName(timestamp);
    var targetPath = '../../Jams/' + jamName;
    var targetDir = path.join(__dirname, targetPath);

    if (!fs.existsSync(targetDir)){
        fs.mkdirSync(targetDir);
        console.log('Created \'Jams/' + jamName + '\'');
    }

    // create the readme template
    var utils = new Utils();
    var defaultMarkdownContent = utils.getMarkdownFileContents(true, jamName);
    var filename = timestamp + '.md'
    fs.writeFile(path.join(targetDir, filename), defaultMarkdownContent, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

if(DEBUG_MODE) {
    var timestamp = 'TEST_TIMESTAMP';
    console.log('createNewJamFolderName(timestamp) ', createNewJamFolderName(timestamp));
}

createNewJamFolder();
