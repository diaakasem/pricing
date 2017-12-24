'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils(DEBUG, mRoundBase) {
        _classCallCheck(this, Utils);

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


    _createClass(Utils, [{
        key: 'mround',
        value: function mround(val, to) {
            if (!to || to < 1) {
                to = mRoundBase;
            }
            if (val % to < to / 2) {
                return to * Math.floor(val / to);
            } else {
                return to * (Math.floor(val / to) + 1);
            }
        }
    }, {
        key: 'log',
        value: function log(name, value) {
            if (this.DEBUG) {
                console.error(name, value);
            }
        }
    }]);

    return Utils;
}();

exports.default = Utils;
;
//# sourceMappingURL=utils.js.map