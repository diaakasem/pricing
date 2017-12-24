(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pricing = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const utils = require('./utils');

// Based on the 80/20 rule .. doubled
const peopleToReachSinglePayer = 25;
// Price per 1 USD in EGP
const buyUSD = 18;
const sellUSD = 17;
// The Very Base Price
const base = 13;
// The money transfer fees
const deliveryFees = 10;
// is the share that payfort takes  2.65 %
const payfortPercentage = 0.0265;
const payfortConstInUSD = 0.14;
// Taxes
const taxes = 0.22;
const additionalTaxes = 0.14;
// Set Safty Margin .. in case we miss something
const saftyMargin = 0.1;

const DEBUG = false;
function log(name, value) {
    if (DEBUG) {
        console.error(name, value);
    }
}

/**
 * Calculates the payfort fees used to transfer money from user's CC to
 * company's bank account
 * @param {Number} amount The amount in EGP
 * @return {Number} The payfort fees per amount in EGP
 */
module.exports.calcPayFortFees = (amount)=> {
    // The constant that payfort takes in USD
    let payfortConst = payfortConstInUSD * buyUSD;
    let payfortVariable = payfortPercentage * amount;
    return payfortVariable + payfortConst;
};

/**
 * Calculates the taxes
 * @param {Number} amount The amount of money to calculate taxes on
 * @return {Number} The amount of money, with taxes considered ( added )
 */
module.exports.calcTaxes = (amount)=> {
    let ret = amount * taxes + amount * additionalTaxes;
    return ret;
};

// Acquisition by Facebook Ads
const fbPayPerImpression = 0.00734;

// Using Plivo in usd
const plivoSMSUSD = 0.035;

/**
 * Calculate additional fees per user for acquisition
 * @return fixed number based on the plivoSMS rate and fbAd rate
 */
module.exports.additionalFees = ()=> {
    let fbAdPerAccount = fbPayPerImpression * peopleToReachSinglePayer * buyUSD;
    log("FB Ad per Account", fbAdPerAccount);
    let SMSFees = plivoSMSUSD * buyUSD;
    let smsCostUntilWeGetToABuyer = SMSFees * peopleToReachSinglePayer;
    log("SMS Cost per Buyer", smsCostUntilWeGetToABuyer);
    return Math.round(fbAdPerAccount + smsCostUntilWeGetToABuyer);
};

/**
 * @param {Number} packageIndex 0 ( free ) 1 ( basic ) 2 ( advanced ) 3 ( extreme )
 * each packageIndex has more features than the ones before
 * @param {Number} users Buying for how many users. must be > 0
 * @param {Number} months 1 -to- 12
 * @return {Number} The price
 */
module.exports.price = (packageIndex, users, months, roundingBase)=> {
    // Free Package
    if (packageIndex === 0) {
        return 0;
    }
    log('Arguments', {
        index: packageIndex,
        users: users,
        months: months
    });
    // Pricing rounding base
    let roundBase = utils.mround(base, 10) * (roundingBase || 5);
    log('Round Base', roundBase);
    let basePackagePrice = packageIndex * base;
    log('Base Package Price', basePackagePrice);
    let netPrice =  basePackagePrice * months * users ;
    log('Net Price', netPrice);
    let withSaftey = netPrice + (netPrice * saftyMargin);
    log('With Saftey', withSaftey);
    let taxes = this.calcTaxes(withSaftey);
    log('Taxes', taxes);
    log('Additional Fees', this.additionalFees());
    let withAcquisition = this.additionalFees() + taxes + withSaftey;
    log('With Acquisition', withAcquisition);
    let transfereFees = this.calcPayFortFees(withAcquisition);
    log('Transfere Fees', transfereFees);
    let gross = withAcquisition + transfereFees;
    log('Gross', gross);
    let price = utils.mround(gross + (roundBase / 2), roundBase);
    log('Price', price);
    return price;
};

},{"./utils":2}],2:[function(require,module,exports){
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

},{}]},{},[1])(1)
});