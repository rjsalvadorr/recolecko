// For generating timestamps

class TimestampGenerator {
    constructor() {
        this.moment = require('moment');
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
};

module.exports = TimestampGenerator;
