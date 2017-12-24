'use strict';


export default class Utils {

    constructor(DEBUG, mRoundBase) {
        this.DEBUG = DEBUG || false;
        this.mRoundBase = mRoundBase || 25;
    }

    /**
     * Round to the nearest <to>
     * @param {Number} val The original value
     * @param {Number} to the value to round to
     *
     * @return {Number} the calculated value
     */
    mround(val, to) {
        if (!to || to < 1) {
            to = mRoundBase;
        }
        if (val % to < (to/2)) {
            return to * Math.floor(val/to);
        } else {
            return to * (Math.floor(val/to) + 1);
        }
    }

    log(name, value) {
        if (this.DEBUG) {
            console.error(name, value);
        }
    }
};
