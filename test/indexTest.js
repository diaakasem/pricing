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
                    "EGP": {
                        "originalPrice": 0,
                        "price": 0,
                        "saving": 0,
                        "savingPercent": 0,
                    },
                    "USD": {
                        "originalPrice": 0,
                        "price": 0,
                        "saving": 0,
                        "savingPercent": 0,
                    }
                }
            },

            { // Basic
                name: 'basic', users: 1, months: 1, packageIndex: 1, roundingBase: 2.5, result: {
                    "EGP": {
                        "originalPrice": 600,
                        "price": 50,
                        "priceAnnually": 600,
                        "saving": 0,
                        "savingPercent": 0,
                    },
                    "USD": {
                        "originalPrice": 36,
                        "price": 3,
                        "priceAnnually": 36,
                        "saving": 0,
                        "savingPercent": 0,
                    }
                }
            }, {
                name: 'basic', users: 1, months: 12, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 600,
                        "price": 300,
                        "priceAnnually": 300,
                        "saving": 300,
                        "savingPercent": 0.5,
                    },
                    "USD": {
                        "originalPrice": 36,
                        "price": 18,
                        "priceAnnually": 18,
                        "saving": 18,
                        "savingPercent": 0.5,
                    }
                }
            },
            {
                name: 'basic', users: 3, months: 1, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 1800,
                        "price": 100,
                        "priceAnnually": 1200,
                        "saving": 600,
                        "savingPercent": 0.33,
                    },
                    "USD": {
                        "originalPrice": 108,
                        "price": 6,
                        "priceAnnually": 72,
                        "saving": 36,
                        "savingPercent": 0.33,
                    }
                }
            }, {
                name: 'basic', users: 3, months: 12, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 1800,
                        "price": 750,
                        "priceAnnually": 750,
                        "saving": 1050,
                        "savingPercent": 0.58,
                    },
                    "USD": {
                        "originalPrice": 108,
                        "price": 45,
                        "priceAnnually": 45,
                        "saving": 63,
                        "savingPercent": 0.58,
                    }
                }
            }, {
                name: 'basic', users: 5, months: 1, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 3000,
                        "price": 150,
                        "priceAnnually": 1800,
                        "saving": 1200,
                        "savingPercent": 0.4,
                    },
                    "USD": {
                        "originalPrice": 180,
                        "price": 9,
                        "priceAnnually": 108,
                        "saving": 72,
                        "savingPercent": 0.4,
                    }
                }
            }, {
                name: 'basic', users: 5, months: 12, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 3000,
                        "price": 1250,
                        "priceAnnually": 1250,
                        "saving": 1750,
                        "savingPercent": 0.58,
                    },
                    "USD": {
                        "originalPrice": 180,
                        "price": 75,
                        "priceAnnually": 75,
                        "saving": 105,
                        "savingPercent": 0.58,
                    }
                }
            }, {
                name: 'basic', users: 10, months: 1, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 6000,
                        "price": 250,
                        "priceAnnually": 3000,
                        "saving": 3000,
                        "savingPercent": 0.5,
                    },
                    "USD": {
                        "originalPrice": 360,
                        "price": 15,
                        "priceAnnually": 180,
                        "saving": 180,
                        "savingPercent": 0.5,
                    }
                }
            }, {
                name: 'basic', users: 10, months: 12, packageIndex: 1, result: {
                    "EGP": {
                        "originalPrice": 6000,
                        "price": 2450,
                        "priceAnnually": 2450,
                        "saving": 3550,
                        "savingPercent": 0.59,
                    },
                    "USD": {
                        "originalPrice": 360,
                        "price": 147,
                        "priceAnnually": 147,
                        "saving": 213,
                        "savingPercent": 0.59,
                    }
                }
            },
            // Advanced
            {
                name: 'advanced', users: 1, months: 1, packageIndex: 2, roundingBase: 2.5, result: {
                    "EGP": {
                        "originalPrice": 900,
                        "price": 75,
                        "priceAnnually": 900,
                        "saving": 0,
                        "savingPercent": 0,
                    },
                    "USD": {
                        "originalPrice": 72,
                        "price": 6,
                        "priceAnnually": 72,
                        "saving": 0,
                        "savingPercent": 0,
                    }
                }
            }, {
                name: 'advanced', users: 1, months: 12, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 1200,
                        "price": 550,
                        "priceAnnually": 550,
                        "saving": 650,
                        "savingPercent": 0.54,
                    },
                    "USD": {
                        "originalPrice": 72,
                        "price": 36,
                        "priceAnnually": 36,
                        "saving": 36,
                        "savingPercent": 0.5,
                    }
                }
            }, {
                name: 'advanced', users: 3, months: 1, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 3600,
                        "price": 150,
                        "priceAnnually": 1800,
                        "saving": 1800,
                        "savingPercent": 0.5,
                    },
                    "USD": {
                        "originalPrice": 216,
                        "price": 12,
                        "priceAnnually": 144,
                        "saving": 72,
                        "savingPercent": 0.33,
                    }
                }
            }, {
                name: 'advanced', users: 3, months: 12, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 3600,
                        "price": 1500,
                        "priceAnnually": 1500,
                        "saving": 2100,
                        "savingPercent": 0.58,
                    },
                    "USD": {
                        "originalPrice": 216,
                        "price": 90,
                        "priceAnnually": 90,
                        "saving": 126,
                        "savingPercent": 0.58,
                    }
                }
            }, {
                name: 'advanced', users: 5, months: 1, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 6000,
                        "price": 250,
                        "priceAnnually": 3000,
                        "saving": 3000,
                        "savingPercent": 0.5,
                    },
                    "USD": {
                        "originalPrice": 360,
                        "price": 18,
                        "priceAnnually": 216,
                        "saving": 144,
                        "savingPercent": 0.4,
                    }
                }
            }, {
                name: 'advanced', users: 5, months: 12, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 6000,
                        "price": 2450,
                        "priceAnnually": 2450,
                        "saving": 3550,
                        "savingPercent": 0.59,
                    },
                    "USD": {
                        "originalPrice": 360,
                        "price": 150,
                        "priceAnnually": 150,
                        "saving": 210,
                        "savingPercent": 0.58,
                    }
                }
            }, {
                name: 'advanced', users: 10, months: 1, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 12000,
                        "price": 450,
                        "priceAnnually": 5400,
                        "saving": 6600,
                        "savingPercent": 0.55,
                    },
                    "USD": {
                        "originalPrice": 720,
                        "price": 30,
                        "priceAnnually": 360,
                        "saving": 360,
                        "savingPercent": 0.5,
                    }
                }
            }, {
                name: 'advanced', users: 10, months: 12, packageIndex: 2, result: {
                    "EGP": {
                        "originalPrice": 12000,
                        "price": 4850,
                        "priceAnnually": 4850,
                        "saving": 7150,
                        "savingPercent": 0.6,
                    },
                    "USD": {
                        "originalPrice": 720,
                        "price": 288,
                        "priceAnnually": 288,
                        "saving": 432,
                        "savingPercent": 0.6,
                    }
                }
            },
            // Extreme
            {
                name: 'extreme', users: 1, months: 1, packageIndex: 3, roundingBase: 2.5, result: {
                    "EGP": {
                        "originalPrice": 1200,
                        "price": 100,
                        "priceAnnually": 1200,
                        "saving": 0,
                        "savingPercent": 0,
                    },
                    "USD": {
                        "originalPrice": 108,
                        "price": 9,
                        "priceAnnually": 108,
                        "saving": 0,
                        "savingPercent": 0,
                    }
                }
            }, {
                name: 'extreme', users: 1, months: 12, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 1200,
                        "price": 750,
                        "priceAnnually": 750,
                        "saving": 450,
                        "savingPercent": 0.38,
                    },
                    "USD": {
                        "originalPrice": 108,
                        "price": 45,
                        "priceAnnually": 45,
                        "saving": 63,
                        "savingPercent": 0.58,
                    }
                }
            }, {
                name: 'extreme', users: 3, months: 1, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 3600,
                        "price": 250,
                        "priceAnnually": 3000,
                        "saving": 600,
                        "savingPercent": 0.17,
                    },
                    "USD": {
                        "originalPrice": 324,
                        "price": 18,
                        "priceAnnually": 216,
                        "saving": 108,
                        "savingPercent": 0.33,
                    }
                }
            }, {
                name: 'extreme', users: 3, months: 12, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 3600,
                        "price": 2200,
                        "priceAnnually": 2200,
                        "saving": 1400,
                        "savingPercent": 0.39,
                    },
                    "USD": {
                        "originalPrice": 324,
                        "price": 135,
                        "priceAnnually": 135,
                        "saving": 189,
                        "savingPercent": 0.58,
                    }
                }
            }, {
                name: 'extreme', users: 5, months: 1, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 6000,
                        "price": 350,
                        "priceAnnually": 4200,
                        "saving": 1800,
                        "savingPercent": 0.3,
                    },
                    "USD": {
                        "originalPrice": 540,
                        "price": 27,
                        "priceAnnually": 324,
                        "saving": 215.99999999999994,
                        "savingPercent": 0.4,
                    }
                }
            }, {
                name: 'extreme', users: 5, months: 12, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 6000,
                        "price": 3650,
                        "priceAnnually": 3650,
                        "saving": 2350,
                        "savingPercent": 0.39,
                    },
                    "USD": {
                        "originalPrice": 540,
                        "price": 216,
                        "priceAnnually": 216,
                        "saving": 324,
                        "savingPercent": 0.6,
                    }
                }
            }, {
                name: 'extreme', users: 10, months: 1, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 12000,
                        "price": 650,
                        "priceAnnually": 7800,
                        "saving": 4200,
                        "savingPercent": 0.35,
                    },
                    "USD": {
                        "originalPrice": 1080,
                        "price": 45,
                        "priceAnnually": 540,
                        "saving": 540,
                        "savingPercent": 0.5,
                    }
                }
            }, {
                name: 'extreme', users: 10, months: 12, packageIndex: 3, result: {
                    "EGP": {
                        "originalPrice": 12000,
                        "price": 7250,
                        "priceAnnually": 7250,
                        "saving": 4750,
                        "savingPercent": 0.4,
                    },
                    "USD": {
                        "originalPrice": 1080,
                        "price": 432,
                        "priceAnnually": 432,
                        "saving": 648,
                        "savingPercent": 0.6,
                    }
                }
            },
        ]
        let toBeTested = _.filter(expectations, { });
        _.each(toBeTested, (e)=> {
            it(`Should return ${e.result.price} for ${e.users} user paying every ${e.months} for ${e.name} package`, function() {
                let priceObj = Pricing.price(e.packageIndex, e.users, e.months, e.roundingBase);
                expect(priceObj).to.deep.equal(e.result);
            });
        });
    });
});
