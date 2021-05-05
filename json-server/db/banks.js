let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    banks: bankFactory(30),
}

function bankFactory(count) {
    return factory( _ => {
        return { 
            id: faker.datatype.number(),
            code: faker.finance.creditCardCVV(),
            name: faker.finance.accountName(),
            transfer: faker.datatype.boolean(),
            status: faker.datatype.boolean(),
            country: faker.address.countryCode()
        }
    }, count);
}