'use strict';

import Utils from './utils';

export default class PackagePricing {

    constructor() {
        //DEBUG
        this.utils = new Utils(false, 25);
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
    calcPayFortFees(amount) {
        // The constant that payfort takes in USD
        let payfortConst = this.payfortConstInUSD * this.buyUSD;
        let payfortVariable = this.payfortPercentage * amount;
        return payfortVariable + payfortConst;
    }

    /**
     * Calculates the taxes
     * @param {Number} amount The amount of money to calculate taxes on
     * @return {Number} The amount of money, with taxes considered ( added )
     */
    calcTaxes(amount) {
        let ret = amount * this.taxes + amount * this.additionalTaxes;
        return ret;
    }

    /**
     * Calculate additional fees per user for acquisition
     * @return fixed number based on the plivoSMS rate and fbAd rate
     */
    additionalFees() {
        let fbAdPerAccount = this.fbPayPerImpression * this.peopleToReachSinglePayer * this.buyUSD;
        this.utils.log("FB Ad per Account", fbAdPerAccount);
        let SMSFees = this.plivoSMSUSD * this.buyUSD;
        let smsCostUntilWeGetToABuyer = SMSFees * this.peopleToReachSinglePayer;
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
    price(packageIndex, users, months, roundingBase) {
        // Free Package
        if (packageIndex === 0) {
            return {
                'EGP': {
                    originalPrice: 0,
                    price: 0,
                    saving: 0,
                    savingPercent: 0
                },
                'USD': {
                    originalPrice: 0,
                    price: 0,
                    saving: 0,
                    savingPercent: 0
                }
            };
        }
        this.utils.log('Arguments', {
            index: packageIndex,
            users: users,
            months: months
        });
        // Pricing rounding base
        let roundBase = this.utils.mround(this.priceBase, 10) * (roundingBase || this.defaultRoundingBase);
        // USD Pricing rounding base
        let usdRoundBase = 3 * packageIndex;
        this.utils.log('Round Base', roundBase);
        let basePackagePrice = packageIndex * this.priceBase;
        this.utils.log('Base Package Price', basePackagePrice);
        let netPrice =  basePackagePrice * months * users ;
        this.utils.log('Net Price', netPrice);
        let withSaftey = netPrice + (netPrice * this.saftyMargin);
        this.utils.log('With Saftey', withSaftey);
        let taxes = this.calcTaxes(withSaftey);
        this.utils.log('Taxes', taxes);
        this.utils.log('Additional Fees', this.additionalFees());
        let withAcquisition = this.additionalFees() + taxes + withSaftey;
        this.utils.log('With Acquisition', withAcquisition);
        let transfereFees = this.calcPayFortFees(withAcquisition);
        this.utils.log('Transfere Fees', transfereFees);
        let gross = withAcquisition + transfereFees;
        this.utils.log('Gross', gross);
        let price = this.utils.mround(gross + (roundBase / 2), roundBase);
        this.utils.log('Price', price);
        let originalPriceInUsd = price / this.sellUSD;
        this.utils.log('Original Price In USD', originalPriceInUsd);
        let priceInUsd = this.utils.mround(originalPriceInUsd + (usdRoundBase/2), usdRoundBase);
        this.utils.log('Price In USD', priceInUsd);
        let savingsEGP = this.calcSavings(packageIndex, price, users, months, 'EGP');
        let savingsUSD = this.calcSavings(packageIndex, priceInUsd, users, months, 'usd');
        return {
            'EGP': {
                priceAnnually: price * (12/months),
                originalPrice: savingsEGP.originalPrice,
                price: price,
                saving: savingsEGP.saving,
                savingPercent: parseFloat(savingsEGP.percent.toFixed(2))
            },
            'USD': {
                priceAnnually: priceInUsd * (12/months),
                originalPrice: savingsUSD.originalPrice,
                price: priceInUsd,
                saving: savingsUSD.saving,
                savingPercent: parseFloat(savingsUSD.percent.toFixed(2))
            }
        };
    };

    calcSavings(packageIndex, price, users, months, currency) {
        let singleUserPaysMonthly = (price / users) / months;
        this.utils.log('Single User Pays Monthly', singleUserPaysMonthly);
        let singleUserPaysAnnually = singleUserPaysMonthly * 12;
        this.utils.log('Single User Pays Annually', singleUserPaysAnnually);
        let youPayAnnually = singleUserPaysAnnually * users;
        let baseSavingPrice = youPayAnnually;
        if (!(users === 1 && months === 1)) {
            if (currency.toLowerCase() === 'egp') {
                baseSavingPrice = this.price(packageIndex, 1, 1).EGP.price * 12 * users;
            } else {
                baseSavingPrice = this.price(packageIndex, 1, 1).USD.price * 12 * users;
            }
        }
        this.utils.log('Base Savinig Price', baseSavingPrice);
        let youSave = baseSavingPrice - youPayAnnually;
        this.utils.log('You Save', youSave);
        let savingPercent = youSave/baseSavingPrice
        this.utils.log('Saving Percent', savingPercent);
        return {
            packageIndex: packageIndex,
            originalPrice: baseSavingPrice,
            price: price,
            users: users,
            months: months,
            currency: currency.toUpperCase(),
            saving: youSave,
            percent: savingPercent
        };
    }
};
