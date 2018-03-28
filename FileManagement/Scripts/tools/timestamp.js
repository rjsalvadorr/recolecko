// For generating timestamps
var DEBUG_MODE = false;

class TimestampGenerator {
    constructor() {
        this.moment = require('moment');
    }

    padNumber(num, size) {
        var s = String(num);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }

    getSimpleDate() {
        return this.moment().format('YYYY-MMM-DD');
    }
    
    getSimplerDate() {
        return this.moment().format('MMM_DD_YYYY');
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getTimestamp() {
        return this.moment().unix();
    }

    getTimestampMilliseconds() {
        return this.moment().valueOf();
    }

    getTimestampHex() {
        return this.getTimestamp().toString(16);
    }

    getTimestampMillisecondsHex() {
        return this.getTimestampMilliseconds().toString(16);
    }

    getTwoCharID() {
        // Should probably be in utils, but that may cause issues
        // with circular dependency...
        var length = 2;
        var text = "";
        var possible = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    getProjectTimestamp() {
        var dayOfYear = this.moment().format('DDDD');
        var dayOfWeek = this.moment().format('E');
        var timeString = ''.concat(dayOfYear, dayOfWeek);
        var timeStringVal = parseInt(timeString, 10);
        var timeStringHex = timeStringVal.toString(16).toUpperCase();
        var randomTwoCharId = this.getTwoCharID();

        var returnVal = ''.concat(timeStringHex, randomTwoCharId);

        if(DEBUG_MODE) {
            console.log('timeString', timeString);
            console.log('timeStringVal', timeStringVal);
            console.log('returnVal', returnVal);
            console.log('randomNumber', randomNumber);
            console.log('randomStringHex', randomStringHex);
            console.log('randomTwoCharId', randomTwoCharId);
        }

        return returnVal;
    }
};

module.exports = TimestampGenerator;
