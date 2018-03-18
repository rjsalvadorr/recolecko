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
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

// Filter filenames based on regex
var filterFilenames = function(filelist) {
    var re = /\d{4}-[-\w]+-(\d{2,3}bpm-)?\d+\.(wav|mp3|midi|mid)/;
    filteredList = [];
    filelist.forEach(function (filename) {
        if(filename.match(re)) {
            filteredList.push(filename);
        }
    });
    return filteredList;
};

var convertListToString = function(filenameList) {
    listString = '';
    filenameList.forEach(function (fname) {
        listString = listString.concat(fname, '\r\n');
    });
    return listString;
};

//////////

var fileList = walkSync('../..');
var filteredList = filterFilenames(fileList);
var fileListString = convertListToString(filteredList);

console.log('fileList', fileList);
console.log('filteredList', filteredList);
console.log('fileListString', fileListString);

var fs = require('fs');
fs.writeFile('music-files.txt', fileListString, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("File list generated.");
}); 