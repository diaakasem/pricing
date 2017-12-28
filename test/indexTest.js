'use strict';

import  _ from 'lodash';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import PricingModule from '../src/index';
const Pricing = new PricingModule();

describe('Price', function() {
    it('Should Exist', function() {
        expect(Pricing.price).to.exist;
    });
    describe('Happy Scenario', ()=> {
        let expectations = [
            {
                name: 'free', users: 1, months: 1, packageIndex: 0, result: {
                    priceInEgp: 0,
                    priceInUsd: 0,
                    savingInEgp: 0,
                    savingPercent: 0,
                }
            },

            { // Basic
                name: 'basic', users: 1, months: 1, packageIndex: 1, roundingBase: 2.5, result: {
                    priceInEgp: 50,
                    priceInUsd: 3,
                    savingInEgp: 0,
                    savingPercent: 0,
                }
            }, {
                name: 'basic', users: 1, months: 12, packageIndex: 1, result: {
                    "priceInEgp": 300,
                    "priceInUsd": 18,
                    "savingInEgp": 300,
                    "savingPercent": 0.5
                }
            }, {
                name: 'basic', users: 3, months: 1, packageIndex: 1, result: {
                    "priceInEgp": 100,
                    "priceInUsd": 6,
                    "savingInEgp": 200,
                    "savingPercent": 0.3333333333333333
                }
            }, {
                name: 'basic', users: 3, months: 12, packageIndex: 1, result: {
                    "priceInEgp": 750,
                    "priceInUsd": 45,
                    "savingInEgp": 350,
                    "savingPercent": 0.5833333333333334,
                }
            }, {
                name: 'basic', users: 5, months: 1, packageIndex: 1, result: {
                    "priceInEgp": 150,
                    "priceInUsd": 9,
                    "savingInEgp": 240,
                    "savingPercent": 0.4
                },
            }, {
                name: 'basic', users: 5, months: 12, packageIndex: 1, result: {
                    "priceInEgp": 1250,
                    "priceInUsd": 75,
                    "savingInEgp": 350,
                    "savingPercent": 0.5833333333333334,
                }
            }, {
                name: 'basic', users: 10, months: 1, packageIndex: 1, result: {
                    "priceInEgp": 250,
                    "priceInUsd": 15,
                    "savingInEgp": 300,
                    "savingPercent": 0.5,
                }
            }, {
                name: 'basic', users: 10, months: 12, packageIndex: 1, result: {
                    "priceInEgp": 2450,
                    "priceInUsd": 147,
                    "savingInEgp": 355,
                    "savingPercent": 0.5916666666666667,
                }
            },
            /*
            // Advanced
            {
                name: 'advanced', users: 1, months: 1, packageIndex: 2, roundingBase: 2.5, result: {
                    price: 75,
                }
            }, {
                name: 'advanced', users: 1, months: 12, packageIndex: 2, result: {
                    price: 550
                }
            }, {
                name: 'advanced', users: 3, months: 1, packageIndex: 2, result: {
                    price: 150
                }
            }, {
                name: 'advanced', users: 3, months: 12, packageIndex: 2, result: {
                    price: 1500
                }
            }, {
                name: 'advanced', users: 5, months: 1, packageIndex: 2, result: {
                    price: 250
                }
            }, {
                name: 'advanced', users: 5, months: 12, packageIndex: 2, result: {
                    price: 2450
                }
            }, {
                name: 'advanced', users: 10, months: 1, packageIndex: 2, result: {
                    price: 450
                }
            }, {
                name: 'advanced', users: 10, months: 12, packageIndex: 2, result: {
                    price: 4850
                }
            },

            // Extreme
            {
                name: 'extreme', users: 1, months: 1, packageIndex: 3, roundingBase: 2.5, result: {
                    price: 100,
                }
            }, {
                name: 'extreme', users: 1, months: 12, packageIndex: 3, result: {
                    price: 750
                }
            }, {
                name: 'extreme', users: 3, months: 1, packageIndex: 3, result: {
                    price: 250
                }
            }, {
                name: 'extreme', users: 3, months: 12, packageIndex: 3, result: {

                    price: 2200
                }
            }, {
                name: 'extreme', users: 5, months: 1, packageIndex: 3, result: {
                    price: 350
                }
            }, {
                name: 'extreme', users: 5, months: 12, packageIndex: 3, result: {
                    price: 3650
                }
            }, {
                name: 'extreme', users: 10, months: 1, packageIndex: 3, result: {
                    price: 650
                }
            }, {
                name: 'extreme', users: 10, months: 12, packageIndex: 3, result: {
                    price: 7250
                }
            },
                */
        ]
        _.each(expectations, (e)=> {
            it(`Should return ${e.result.priceInEgp} for ${e.users} user paying every ${e.months} for ${e.name} package`, function() {
                let priceObj = Pricing.price(e.packageIndex, e.users, e.months, e.roundingBase);
                expect(priceObj).to.deep.equal(e.result);
            });
        });
    });
});
