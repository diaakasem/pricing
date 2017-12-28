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
                    "savingPercent": 0.33
                }
            }, {
                name: 'basic', users: 3, months: 12, packageIndex: 1, result: {
                    "priceInEgp": 750,
                    "priceInUsd": 45,
                    "savingInEgp": 350,
                    "savingPercent": 0.58,
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
                    "savingPercent": 0.58,
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
                    "savingPercent": 0.59,
                }
            },
            // Advanced
            {
                name: 'advanced', users: 1, months: 1, packageIndex: 2, roundingBase: 2.5, result: {
                    "priceInEgp": 75,
                    "priceInUsd": 6,
                    "savingInEgp": 0,
                    "savingPercent": 0,
                }
            }, {
                name: 'advanced', users: 1, months: 12, packageIndex: 2, result: {
                    "priceInEgp": 550,
                    "priceInUsd": 36,
                    "savingInEgp": 650,
                    "savingPercent": 0.54,
                }
            }, {
                name: 'advanced', users: 3, months: 1, packageIndex: 2, result: {
                    "priceInEgp": 150,
                    "priceInUsd": 12,
                    "savingInEgp": 600,
                    "savingPercent": 0.5,
                }
            }, {
                name: 'advanced', users: 3, months: 12, packageIndex: 2, result: {
                    "priceInEgp": 1500,
                    "priceInUsd": 90,
                    "savingInEgp": 700,
                    "savingPercent": 0.58,
                }
            }, {
                name: 'advanced', users: 5, months: 1, packageIndex: 2, result: {
                    "priceInEgp": 250,
                    "priceInUsd": 18,
                    "savingInEgp": 600,
                    "savingPercent": 0.5,
                }
            }, {
                name: 'advanced', users: 5, months: 12, packageIndex: 2, result: {
                    "priceInEgp": 2450,
                    "priceInUsd": 150,
                    "savingInEgp": 710,
                    "savingPercent": 0.59,
                }
            }, {
                name: 'advanced', users: 10, months: 1, packageIndex: 2, result: {
                    "priceInEgp": 450,
                    "priceInUsd": 30,
                    "savingInEgp": 660,
                    "savingPercent": 0.55,
                }
            }, {
                name: 'advanced', users: 10, months: 12, packageIndex: 2, result: {
                    "priceInEgp": 4850,
                    "priceInUsd": 288,
                    "savingInEgp": 715,
                    "savingPercent": 0.6,
                }
            },
            // Extreme
            {
                name: 'extreme', users: 1, months: 1, packageIndex: 3, roundingBase: 2.5, result: {
                    "priceInEgp": 100,
                    "priceInUsd": 9,
                    "savingInEgp": 0,
                    "savingPercent": 0,
                }
            }, {
                name: 'extreme', users: 1, months: 12, packageIndex: 3, result: {
                    "priceInEgp": 750,
                    "priceInUsd": 45,
                    "savingInEgp": 450,
                    "savingPercent": 0.38,
                }
            }, {
                name: 'extreme', users: 3, months: 1, packageIndex: 3, result: {
                    "priceInEgp": 250,
                    "priceInUsd": 18,
                    "savingInEgp": 200,
                    "savingPercent": 0.17,
                }
            }, {
                name: 'extreme', users: 3, months: 12, packageIndex: 3, result: {
                    "priceInEgp": 2200,
                    "priceInUsd": 135,
                    "savingInEgp": 466.66666666666663,
                    "savingPercent": 0.39,
                }
            }, {
                name: 'extreme', users: 5, months: 1, packageIndex: 3, result: {
                    "priceInEgp": 350,
                    "priceInUsd": 27,
                    "savingInEgp": 360,
                    "savingPercent": 0.3,
                }
            }, {
                name: 'extreme', users: 5, months: 12, packageIndex: 3, result: {
                    "priceInEgp": 3650,
                    "priceInUsd": 216,
                    "savingInEgp": 470,
                    "savingPercent": 0.39,
                }
            }, {
                name: 'extreme', users: 10, months: 1, packageIndex: 3, result: {
                    "priceInEgp": 650,
                    "priceInUsd": 45,
                    "savingInEgp": 420,
                    "savingPercent": 0.35,
                }
            }, {
                name: 'extreme', users: 10, months: 12, packageIndex: 3, result: {
                    "priceInEgp": 7250,
                    "priceInUsd": 432,
                    "savingInEgp": 475,
                    "savingPercent": 0.4,
                }
            },
        ]
        _.each(expectations, (e)=> {
            it(`Should return ${e.result.priceInEgp} for ${e.users} user paying every ${e.months} for ${e.name} package`, function() {
                let priceObj = Pricing.price(e.packageIndex, e.users, e.months, e.roundingBase);
                expect(priceObj).to.deep.equal(e.result);
            });
        });
    });
});
