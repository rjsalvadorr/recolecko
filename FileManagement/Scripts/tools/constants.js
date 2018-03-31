
var path = require('path');

class Constants {
  constructor() {
    var idRegex = '[0-9A-F]{3}[0-9A-Z]{2}';
    var formatRegexLower = 'wav|mp3|midi|mid|rpp';
    var formatRegexUpper = 'WAV|MP3|MIDI|MID|RPP';
    var formatRegex = '(' + formatRegexLower + '|' + formatRegexUpper + ')';

    this.ROOT_PATH = path.join(__dirname, '../../..');
    this.MUSIC_FOLDER_REGEX = new RegExp('[\/\\](Jams|Projects)[\/\\]' + idRegex + '-[\\w]+$');
    this.MUSIC_FILE_REGEX = new RegExp('^' + idRegex + '-[-\\w]+(-\\d{2,3}bpm)?(-\\d{1,2})?\\.' + formatRegex + '$');
    this.TABLE_HEADER_LIST = 'PROJECT_ID,NAME,TEMPO,VERSION,TYPE\r\n';
  }
};

module.exports = Constants;
