var DEBUG_MODE = false;
var MUSIC_FILE_REGEX = /^(\d{4}|[0-9a-fA-F]{5})-[-\w]+(-\d{2,3}bpm)?(-\d{1,2})?\.(wav|mp3|midi|mid|rpp)$/gi;

//////////

// Parses filenames that match the regex
var parseFilename = function(filename) {
    var returnObj = {
        projectId: '',
        tempo: '',
        version: '',
        name: '',
        type: '',
    };
    var juicyInfo = filename.split('.');
    var juicyChunks = juicyInfo[0].split('-');
    var finalIdx = juicyChunks.length - 1;

    juicyChunks.forEach(function(chunk, idx) {
        if(idx === 0 && (chunk.match(/^\d{4}$/) || chunk.match(/^[0-9a-fA-F]{5}$/))) {
            returnObj.projectId = chunk;
        } else if(chunk.match(/^\d{2,3}bpm$/)) {
            returnObj.tempo = chunk;
        } else if(idx === finalIdx && chunk.match(/^\d{1,2}$/)) {
            returnObj.version = chunk;
        }
    });

    var nameChunks = juicyChunks.filter(function(chunk) {
        return chunk !== returnObj.projectId && chunk !== returnObj.tempo && chunk !== returnObj.version;
    })
    returnObj.name = nameChunks.join('-');
    returnObj.type = juicyInfo[1];

    return returnObj;
}

// Filter filenames based on regex
var isMusicFile = function(filename) {
    if(filename.match(MUSIC_FILE_REGEX)) {
        return true;
    }
    return false;
};

// See https://gist.github.com/kethinov/6658166
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            if(isMusicFile(file)) {
                filelist.push(file);
            }
        }
    });
    return filelist;
};

var convertListToString = function(filenameList) {
    var listString = 'PROJECT_ID,NAME,TEMPO,VERSION,TYPE\r\n';
    var musicData = {};
    var textLine = '';
    filenameList.forEach(function (fname) {
        musicData = parseFilename(fname);
        textLine = musicData.projectId + ',' + musicData.name + ',' + musicData.tempo + ',' + musicData.version + ',' + musicData.type;
        listString = listString.concat(textLine, '\r\n');
    });
    return listString;
};

//////////

var path = require("path");
var rootDirectory = path.join(__dirname, '../..');
var fileList = walkSync( rootDirectory);
var fileListString = convertListToString(fileList);
var hackyMusicData = [];
fileList.forEach(function (fname) {
    hackyMusicData.push(parseFilename(fname));
});

if (DEBUG_MODE) {
    console.log('__dirname', __dirname);
    console.log('rootDirectory', rootDirectory);
    console.log('fileList', fileList);
    console.log('fileListString', fileListString);
    console.log('parseFilename', parseFilename('0012-whatever-thing-blah-98bpm-02'));
}

// Create data location if it doesn't exist
var fs = require('fs');
var dataLocation = path.join(__dirname, 'data');
if (!fs.existsSync(dataLocation)){
    fs.mkdirSync(dataLocation);
    console.log('Created \'FileManagement/Scripts/data/\' directory');
}

// Write to files!
fs.writeFile(path.join(dataLocation, 'music-inventory.csv'), fileListString, function(err) {
    if(err) {
        return console.log(err);
    }
});
console.log('Created or updated \'FileManagement/Scripts/data/music-inventory.csv\'');

fs.writeFile(path.join(dataLocation, 'music-inventory.json'), JSON.stringify(hackyMusicData, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
});
console.log('Created or updated \'FileManagement/Scripts/data/music-inventory.json\'');

var datafileString = 'var data = ' + JSON.stringify(hackyMusicData, null, 2) + ';\r\n';
fs.writeFile(path.join(dataLocation, 'music-inventory-datafile.js'), datafileString, function(err) {
    if(err) {
        return console.log(err);
    }
});
console.log('Created or updated \'FileManagement/Scripts/data/music-inventory.js\'');
