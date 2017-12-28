'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackagePricing = function () {
    function PackagePricing() {
        _classCallCheck(this, PackagePricing);

        //DEBUG
        this.utils = new _utils2.default(true, 25);
        // Based on the 80/20 rule .. doubled
        this.peopleToReachSinglePayer = 25;
        // Price per 1 USD in EGP
        this.buyUSD = 18;
        this.sellUSD = 17;
        // The Very Base Price
        this.priceBase = 13;
        // The money transfer fees
        this.deliveryFees = 10;
        // is the share that payfort takes  2.65 %
        this.payfortPercentage = 0.0265;
        this.payfortConstInUSD = 0.14;
        // Taxes
        this.taxes = 0.22;
        this.additionalTaxes = 0.14;
        // Set Safty Margin .. in case we miss something
        this.saftyMargin = 0.1;
        // Acquisition by Facebook Ads
        this.fbPayPerImpression = 0.00734;
        // Using Plivo in usd
        this.plivoSMSUSD = 0.035;
        // Default rounding base - will be multiplied by 10
        this.defaultRoundingBase = 5;
    }

    /**
     * Calculates the payfort fees used to transfer money from user's CC to
     * company's bank account
     * @param {Number} amount The amount in EGP
     * @return {Number} The payfort fees per amount in EGP
     */


    _createClass(PackagePricing, [{
        key: 'calcPayFortFees',
        value: function calcPayFortFees(amount) {
            // The constant that payfort takes in USD
            var payfortConst = this.payfortConstInUSD * this.buyUSD;
            var payfortVariable = this.payfortPercentage * amount;
            return payfortVariable + payfortConst;
        }

        /**
         * Calculates the taxes
         * @param {Number} amount The amount of money to calculate taxes on
         * @return {Number} The amount of money, with taxes considered ( added )
         */

    }, {
        key: 'calcTaxes',
        value: function calcTaxes(amount) {
            var ret = amount * this.taxes + amount * this.additionalTaxes;
            return ret;
        }

        /**
         * Calculate additional fees per user for acquisition
         * @return fixed number based on the plivoSMS rate and fbAd rate
         */

    }, {
        key: 'additionalFees',
        value: function additionalFees() {
            var fbAdPerAccount = this.fbPayPerImpression * this.peopleToReachSinglePayer * this.buyUSD;
            this.utils.log("FB Ad per Account", fbAdPerAccount);
            var SMSFees = this.plivoSMSUSD * this.buyUSD;
            var smsCostUntilWeGetToABuyer = SMSFees * this.peopleToReachSinglePayer;
            this.utils.log("SMS Cost per Buyer", smsCostUntilWeGetToABuyer);
            return Math.round(fbAdPerAccount + smsCostUntilWeGetToABuyer);
        }

        /**
         * @param {Number} packageIndex 0 ( free ) 1 ( basic ) 2 ( advanced ) 3 ( extreme )
         * each packageIndex has more features than the ones before
         * @param {Number} users Buying for how many users. must be > 0
         * @param {Number} months 1 -to- 12
         * @return {Number} The price
         */

    }, {
        key: 'price',
        value: function price(packageIndex, users, months, roundingBase) {
            // Free Package
            if (packageIndex === 0) {
                return {
                    priceInEgp: 0,
                    savingInEgp: 0,
                    savingPercent: 0,
                    priceInUsd: 0
                };
            }
            this.utils.log('Arguments', {
                index: packageIndex,
                users: users,
                months: months
            });
            // Pricing rounding base
            var roundBase = this.utils.mround(this.priceBase, 10) * (roundingBase || this.defaultRoundingBase);
            // USD Pricing rounding base
            var usdRoundBase = 3;
            this.utils.log('Round Base', roundBase);
            var basePackagePrice = packageIndex * this.priceBase;
            this.utils.log('Base Package Price', basePackagePrice);
            var netPrice = basePackagePrice * months * users;
            this.utils.log('Net Price', netPrice);
            var withSaftey = netPrice + netPrice * this.saftyMargin;
            this.utils.log('With Saftey', withSaftey);
            var taxes = this.calcTaxes(withSaftey);
            this.utils.log('Taxes', taxes);
            this.utils.log('Additional Fees', this.additionalFees());
            var withAcquisition = this.additionalFees() + taxes + withSaftey;
            this.utils.log('With Acquisition', withAcquisition);
            var transfereFees = this.calcPayFortFees(withAcquisition);
            this.utils.log('Transfere Fees', transfereFees);
            var gross = withAcquisition + transfereFees;
            this.utils.log('Gross', gross);
            var price = this.utils.mround(gross + roundBase / 2, roundBase);
            this.utils.log('Price', price);
            var originalPriceInUsd = price / this.sellUSD;
            this.utils.log('Original Price In USD', originalPriceInUsd);
            var priceInUsd = this.utils.mround(originalPriceInUsd + usdRoundBase / 2, usdRoundBase);
            this.utils.log('Price In USD', priceInUsd);
            var baseSavingPrice = this.utils.mround(roundBase + roundBase / 2, roundBase) * 12;
            if (!(users === 1 && months === 1 && packageIndex === 1)) {
                baseSavingPrice = this.price(1, 1, 1).priceInEgp * 12;
            }
            this.utils.log('Base Savinig Price', baseSavingPrice);
            var singleUserPaysMonthly = price / users / months;
            this.utils.log('Single User Pays Monthly', singleUserPaysMonthly);
            var singleUserPaysAnnually = singleUserPaysMonthly * 12;
            this.utils.log('Single User Pays Annually', singleUserPaysAnnually);
            var youSave = baseSavingPrice - singleUserPaysAnnually;
            this.utils.log('You Save', youSave);
            var savingPercent = youSave / (singleUserPaysAnnually + youSave);
            this.utils.log('Saving Percent', savingPercent);
            return {
                priceInEgp: price,
                priceInUsd: priceInUsd,
                savingInEgp: youSave,
                savingPercent: savingPercent
            };
        }
    }]);

    return PackagePricing;
}();

exports.default = PackagePricing;
;
//# sourceMappingURL=index.js.map