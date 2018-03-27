
class Constants {
  constructor() {
    this.FOLDER_REGEX = /DSFSDF/
    this.MUSIC_FILE_REGEX = /^(\d{4}|[0-9a-fA-F]{5})-[-\w]+(-\d{2,3}bpm)?(-\d{1,2})?\.(wav|mp3|midi|mid|rpp)$/gi;
  }
};

module.exports = Constants;
