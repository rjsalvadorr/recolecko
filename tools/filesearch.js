var DEBUG_MODE = false;
var path = path || require('path');
var fs = fs || require('fs');

var Constants = require('./constants');
var constants = new Constants();

//////////

// Parses filenames that match the regex
var parseFilename = function(filePath) {
    var returnObj = {
        projectId: '',
        tempo: '',
        version: '',
        name: '',
        type: '',
    };
    var fileInfo = path.parse(filePath);
    var filename = fileInfo.base;
    var juicyInfo = filename.split('.');
    var juicyChunks = juicyInfo[0].split('-');
    var finalIdx = juicyChunks.length - 1;

    juicyChunks.forEach(function(chunk, idx) {
        if(idx === 0 && (chunk.match(/^[0-9A-F]{3}[0-9A-Z]{2}$/))) {
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
    returnObj.path = filePath;

    return returnObj;
}

// Filter filenames based on regex
var isMusicFile = function(filename) {
    if(filename.match(constants.MUSIC_FILE_REGEX)) {
        return true;
    }
    return false;
};

// See https://gist.github.com/kethinov/6658166
// List all files in a directory in Node.js recursively in a synchronous fashion
//
var walkSync = function(dir, filelist) {
    var files = fs.readdirSync(dir);
    var truncatedDir = '';
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            if(isMusicFile(file)) {
                truncatedDir = dir.replace(constants.APP_ROOT_PATH, '');
                filelist.push(path.join(truncatedDir, file));
            }
        }
    });
    return filelist;
};

var convertListToString = function(filenameList) {
    var listString = 'PROJECT_ID,NAME,TEMPO,VERSION,TYPE,PATH\r\n';
    var musicData = {};
    var textLine = '';
    filenameList.forEach(function (fname) {
        musicData = parseFilename(fname);
        textLine = musicData.projectId + ',' + musicData.name + ',' + musicData.tempo + ',' + musicData.version + ',' + musicData.type + ',' + musicData.path;
        listString = listString.concat(textLine, '\r\n');
    });
    return listString;
};

function searchFiles() {
    var fileList = walkSync(constants.APP_ROOT_PATH);
    var fileListString = convertListToString(fileList);
    var hackyMusicData = [];
    fileList.forEach(function (fname) {
        hackyMusicData.push(parseFilename(fname));
    });
    var outString = '';

    if (DEBUG_MODE) {
        console.log('__dirname', __dirname);
        console.log('fileList', fileList);
        console.log('fileListString', fileListString);
        console.log('parseFilename', parseFilename('0012-whatever-thing-blah-98bpm-02'));
    }

    // Create data location if it doesn't exist
    var fs = require('fs');
    var dataLocation = path.join(constants.APP_ROOT_PATH, '/FileManagement/Scripts/data');
    if (!fs.existsSync(dataLocation)){
        fs.mkdirSync(dataLocation);
        console.log('Created \'FileManagement/Scripts/data/\' directory');
        outString += 'Created \'FileManagement/Scripts/data/\' directory\n';
    }

    // Write to files!
    fs.writeFile(path.join(dataLocation, 'music-inventory.csv'), fileListString, function(err) {
        if(err) {
            console.log(err);
            return err;
        }
    });
    console.log('Created or updated \'FileManagement/Scripts/data/music-inventory.csv\'');
    outString += 'Updated \'FileManagement/Scripts/data/music-inventory.csv\'\n';

    fs.writeFile(path.join(dataLocation, 'music-inventory.json'), JSON.stringify(hackyMusicData, null, 2), function(err) {
        if(err) {
            console.log(err);
            return err;
        }
    });
    console.log('Created or updated \'FileManagement/Scripts/data/music-inventory.json\'');
    outString += 'Updated \'FileManagement/Scripts/data/music-inventory.json\'\n';

    var datafileString = 'var data = ' + JSON.stringify(hackyMusicData, null, 2) + ';\r\n';
    fs.writeFile(path.join(dataLocation, 'music-inventory-datafile.js'), datafileString, function(err) {
        if(err) {
            console.log(err);
            return err;
        }
    });
    console.log('Created or updated \'FileManagement/Scripts/data/music-inventory.js\'');
    outString += 'Updated \'FileManagement/Scripts/data/music-inventory.js\'\n';

    return outString;
}

module.exports = searchFiles;
