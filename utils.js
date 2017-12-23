'use strict';

const mRoundBase = 25;

/**
 * Round to the nearest <to>
 * @param {Number} val The original value
 * @param {Number} to the value to round to
 * @return {Number} the calculated value
 */
module.exports.mround = (val, to)=> {
    if (!to || to < 1) {
        to = mRoundBase;
    }
    if (val % to < (to/2)) {
        return to * Math.floor(val/to);
    } else {
        return to * (Math.floor(val/to) + 1);
    }
};
