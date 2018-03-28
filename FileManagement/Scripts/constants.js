
var path = require('path');

class Constants {
  constructor() {
    this.ROOT_PATH = path.join(__dirname, '../..');
    this.MUSIC_FOLDER_REGEX = /[\\/](Jams|Projects)[\\/][0-9A-F]{3}[0-9A-Z]{2}-[\w]+$/;
    this.MUSIC_FILE_REGEX = /^(\d{4}|[0-9A-F]{3}[0-9A-Z]{2})-[-\w]+(-\d{2,3}bpm)?(-\d{1,2})?\.(wav|mp3|midi|mid|rpp)$/;
    this.TABLE_HEADER_LIST = 'PROJECT_ID,NAME,TEMPO,VERSION,TYPE\r\n';
  }
};

module.exports = Constants;
