'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

const Pricing = require('../index');

describe('Price', function() {
    it('Should Exist', function() {
        expect(Pricing.price).to.exist;
    });
    describe('Happy Scenario', ()=> {
        let expectations = [
            { name: 'free', users: 1, months: 1, price: 0, packageIndex: 0},

            // Basic
            { name: 'basic', users: 1, months: 1, packageIndex: 1, price: 50, roundingBase: 2.5},
            { name: 'basic', users: 1, months: 12, packageIndex: 1, price: 300},
            { name: 'basic', users: 3, months: 1, packageIndex: 1, price: 100},
            { name: 'basic', users: 3, months: 12, packageIndex: 1, price: 750},
            { name: 'basic', users: 5, months: 1, packageIndex: 1, price: 150},
            { name: 'basic', users: 5, months: 12, packageIndex: 1, price: 1250},
            { name: 'basic', users: 10, months: 1, packageIndex: 1, price: 250},
            { name: 'basic', users: 10, months: 12, packageIndex: 1, price: 2450},

            // Advanced
            { name: 'advanced', users: 1, months: 1, packageIndex: 2, price: 75, roundingBase: 2.5},
            { name: 'advanced', users: 1, months: 12, packageIndex: 2, price: 550},
            { name: 'advanced', users: 3, months: 1, packageIndex: 2, price: 150},
            { name: 'advanced', users: 3, months: 12, packageIndex: 2, price: 1500},
            { name: 'advanced', users: 5, months: 1, packageIndex: 2, price: 250},
            { name: 'advanced', users: 5, months: 12, packageIndex: 2, price: 2450},
            { name: 'advanced', users: 10, months: 1, packageIndex: 2, price: 450},
            { name: 'advanced', users: 10, months: 12, packageIndex: 2, price: 4850},

            // Extreme
            { name: 'extreme', users: 1, months: 1, packageIndex: 3, price: 100, roundingBase: 2.5},
            { name: 'extreme', users: 1, months: 12, packageIndex: 3, price: 750},
            { name: 'extreme', users: 3, months: 1, packageIndex: 3, price: 250},
            { name: 'extreme', users: 3, months: 12, packageIndex: 3, price: 2200},
            { name: 'extreme', users: 5, months: 1, packageIndex: 3, price: 350},
            { name: 'extreme', users: 5, months: 12, packageIndex: 3, price: 3650},
            { name: 'extreme', users: 10, months: 1, packageIndex: 3, price: 650},
            { name: 'extreme', users: 10, months: 12, packageIndex: 3, price: 7250},
        ]
        _.each(expectations, (e)=> {
            it(`Should return ${e.price} for ${e.users} user paying every ${e.months} for ${e.name} package`, function() {
                let price = Pricing.price(e.packageIndex, e.users, e.months, e.roundingBase);
                expect(price).to.equal(e.price);
            });
        });
    });
});
