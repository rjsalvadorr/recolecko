// For various utilities
var DEBUG_MODE = false;
var CRLF = '\r\n';
var TimestampGenerator = require('./timestamp');

class Utils {
    constructor() {
        this.timestampGenerator = new TimestampGenerator();
    }

    getMarkdownFileContents(isJam, projectId) {
        var date = this.timestampGenerator.getSimpleDate();
        var type = isJam ? 'Jam' : 'Project';

        var mdString = '' + CRLF;
        mdString += '# ' + projectId + CRLF;
        mdString += '' + CRLF;
        mdString += type + ' started on ' + date + CRLF;
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
};

module.exports = Utils;

if(DEBUG_MODE) {
    var utils = new Utils();
    console.log('utils.getMarkdownFileContents(true, \'C35F7\')');
    console.log(utils.getMarkdownFileContents(true, 'C35F7'));
    console.log('utils.getMarkdownFileContents(false, \'F22C1\')');
    console.log(utils.getMarkdownFileContents(false, 'F22C1'));
}
