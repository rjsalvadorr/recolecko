// For various utilities

var DEBUG_MODE = false;
var CRLF = '\r\n';
var TimestampGenerator = require('./timestamp');

class Utils {
    constructor() {
        this.timestampGenerator = new TimestampGenerator();
    }

    getMarkdownFileContents(projectId) {
        var date = this.timestampGenerator.getSimpleDate();
        var mdString = '' + CRLF;
        mdString += '# ' + projectId + CRLF;
        mdString += '' + CRLF;
        mdString += '_Started on ' + date + '_' + CRLF;
        mdString += '' + CRLF;
        mdString += '## NOTES' + CRLF;
        mdString += '' + CRLF;
        mdString += '...' + CRLF;
        mdString += '' + CRLF;
        mdString += '## TO-DO' + CRLF;
        mdString += '' + CRLF;
        mdString += '...' + CRLF;
        mdString += '' + CRLF;
        
        return mdString;
    }
    
    convertListToStringBruh(filenameList) {
        var listString = '';
        var musicData = {};
        var textLine = '';
        filenameList.forEach(function (fname) {
            musicData = parseFilename(fname);
            textLine = musicData.projectId + ',' + musicData.name + ',' + musicData.tempo + ',' + musicData.version + ',' + musicData.type;
            listString = listString.concat(textLine, CRLF);
        });
        return listString;
    };

    convertListToString(strList) {
        var returnString = '';
        strList.forEach(function (str) {
            returnString = returnString.concat(str, CRLF);
        });
        return returnString;
    };
};

module.exports = Utils;

//////////

if(DEBUG_MODE) {
    var utils = new Utils();
    console.log('utils.getMarkdownFileContents(\'C35F7\')');
    console.log(utils.getMarkdownFileContents('C35F7'));
    console.log('utils.getMarkdownFileContents(\'F22C1\')');
    console.log(utils.getMarkdownFileContents('F22C1'));
}
