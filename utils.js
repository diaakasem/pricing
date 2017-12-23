'use strict';

const mRoundBase = 25;

/**
 * Round to the nearest <to>
 * @param val The original value
 * @param to the value to round to
 * @return the calculated value
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
