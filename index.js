'use strict';

const base = 14.5;
const deliveryFees = 10;
const saftyMargin = 0.1;
const taxes = 0.22;
const additionalTaxes = 0.14;

const utils = require('./utils');

/**
 * @param packageIndex 0 ( free ) 1 ( basic ) 2 ( advanced ) 3 ( extreme )
 * each packageIndex has more features than the ones before
 *
 * @param usersCount Buying for how many users. must be > 0
 * @param monthsCount 1 -to- 12
 */
module.exports.price = (packageIndex, usersCount, monthsCount)=> {
    // Free Package
    if (packageIndex === 0) {
        return 0;
    }
    // Pricing rounding base
    let roundBase = utils.mround(base, 10) * 2.5;
    let basePackagePrice = packageIndex * base;
    let netPayment = ( basePackagePrice * monthsCount * usersCount ) + deliveryFees ;
    let withSaftey = netPayment + (netPayment * saftyMargin);
    let withTaxes = withSaftey + (withSaftey * taxes) + (withSaftey * additionalTaxes);
    let price = utils.mround(withTaxes + (roundBase / 2), roundBase);
    return price;
};
