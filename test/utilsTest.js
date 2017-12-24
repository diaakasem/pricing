'use strict';

require('babel-register');
var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

import Utils from '../src/utils';
let utils = new Utils(false, 25);

describe('mround', function() {
    it('Should Exist', function() {
        expect(utils.mround).to.exist;
    });
    it('Should round 0 to 0', function() {
        let rounded = utils.mround(0, 25);
        expect(rounded).to.equal(0);
    });
    it('Should round 10 to 0', function() {
        let rounded = utils.mround(10, 25);
        expect(rounded).to.equal(0);
    });
    it('Should round 15 to 25', function() {
        let rounded = utils.mround(15, 25);
        expect(rounded).to.equal(25);
    });
    it('Should round 30 to 25', function() {
        let rounded = utils.mround(30, 25);
        expect(rounded).to.equal(25);
    });
    it('Should round 40 to 50', function() {
        let rounded = utils.mround(40, 25);
        expect(rounded).to.equal(50);
    });
});

