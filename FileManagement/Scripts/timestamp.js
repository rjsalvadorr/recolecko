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

    getProjectTimestamp() {
        var dayOfYear = this.moment().format('DDDD');
        var dayOfWeek = this.moment().format('E');
        var timeString = ''.concat(dayOfYear, dayOfWeek);
        var timeStringVal = parseInt(timeString, 10);
        var timeStringHex = timeStringVal.toString(16).toUpperCase();

        var randomNumber = this.getRandomInt(256);
        var randomStringHex = randomNumber.toString(16).toUpperCase();
        var randomStringHexPadded = this.padNumber(randomStringHex, 2);

        var returnVal = ''.concat(timeStringHex, randomStringHexPadded);

        if(DEBUG_MODE) {
            console.log('timeString', timeString);
            console.log('timeStringVal', timeStringVal);
            console.log('returnVal', returnVal);
            console.log('randomNumber', randomNumber);
            console.log('randomStringHex', randomStringHex);
            console.log('randomStringHexPadded', randomStringHexPadded);
        }

        return returnVal;
    }
};

module.exports = TimestampGenerator;
