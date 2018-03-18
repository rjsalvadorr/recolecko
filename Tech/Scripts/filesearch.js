var debugMode = false;

//////////

// Filter filenames based on regex
var isMusicFile = function(filename) {
    var re = /\d{4}-[-\w]+-(\d{2,3}bpm-)?\d+\.(wav|mp3|midi|mid)/gi;
    if(filename.match(re)) {
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
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
};

var convertListToString = function(filenameList) {
    listString = '';
    filenameList.forEach(function (fname) {
        listString = listString.concat(fname, '\r\n');
    });
    return listString;
};

//////////

var path = require("path");
var targetDir = path.join(__dirname, '../..');
var fileList = walkSync(targetDir);
var fileListString = convertListToString(fileList);

if (debugMode) {
    console.log('__dirname', __dirname);
    console.log('targetDir', targetDir);
    console.log('fileList', fileList);
    console.log('fileListString', fileListString);
}

// Write to file!
var fs = require('fs');
fs.writeFile('music-inventory.txt', fileListString, function(err) {
    if(err) {
        return console.log(err);
    }
});
