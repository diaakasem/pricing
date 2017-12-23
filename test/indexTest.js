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

            { name: 'basic', users: 1, months: 1, packageIndex: 1, price: 50},
            { name: 'basic', users: 3, months: 1, packageIndex: 1, price: 150},
            { name: 'basic', users: 5, months: 1, packageIndex: 1, price: 200},
            { name: 'basic', users: 10, months: 1, packageIndex: 1, price: 300},
            { name: 'basic', users: 1, months: 12, packageIndex: 1, price: 300},
            { name: 'basic', users: 3, months: 12, packageIndex: 1, price: 800},
            { name: 'basic', users: 5, months: 12, packageIndex: 1, price: 1300},
            { name: 'basic', users: 10, months: 12, packageIndex: 1, price: 2450},

            { name: 'advanced', users: 1, months: 1, packageIndex: 1, price: 100},
            { name: 'advanced', users: 3, months: 1, packageIndex: 1, price: 200},
            { name: 'advanced', users: 5, months: 1, packageIndex: 1, price: 300},
            { name: 'advanced', users: 10, months: 1, packageIndex: 1, price: 500},
            { name: 'advanced', users: 1, months: 12, packageIndex: 1, price: 550},
            { name: 'advanced', users: 3, months: 12, packageIndex: 1, price: 1500},
            { name: 'advanced', users: 5, months: 12, packageIndex: 1, price: 2450},
            { name: 'advanced', users: 10, months: 12, packageIndex: 1, price: 4850},

            { name: 'extreme', users: 1, months: 1, packageIndex: 1, price: 150},
            { name: 'extreme', users: 3, months: 1, packageIndex: 1, price: 250},
            { name: 'extreme', users: 5, months: 1, packageIndex: 1, price: 400},
            { name: 'extreme', users: 10, months: 1, packageIndex: 1, price: 700},
            { name: 'extreme', users: 1, months: 12, packageIndex: 1, price: 800},
            { name: 'extreme', users: 3, months: 12, packageIndex: 1, price: 2250},
            { name: 'extreme', users: 5, months: 12, packageIndex: 1, price: 3650},
            { name: 'extreme', users: 10, months: 12, packageIndex: 1, price: 7240},
        ]
        _.each(expectations, (e)=> {
            it(`Should return ${e.price} for ${e.users} user paying every ${e.months} for ${e.name} package`, function() {
                let price = Pricing.price(e.packageIndex, e.users, e.months);
                expect(price).to.equal(e.price);
            });
        });
    });
});
