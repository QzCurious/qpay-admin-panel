let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    cards: [
        {
            channel: 'c01',
            card_id: '1001',
            merchant: 'merchant0',
            bank_name: 'kbank',
            account_name: 'tony_chen',
            card_number: faker.finance.creditCardNumber(),
            limit_daily: 20000,
            limit_once: 2999,
            status: false,
            memo: `Observed ${faker.date.past()}`
        }, 
        {
            channel: 'c02',
            card_id: '1002',
            merchant: 'merchant0',
            bank_name: 'siambank',
            account_name: 'jimmy_wang',
            card_number: faker.finance.creditCardNumber(),
            limit_daily: 100000,
            limit_once: 5000,
            status: true,
            memo: `Observed ${faker.date.recent()}`

        }
    ]
}

function cardFactory(count) {

    return factory( _ => {
        return { 
            channel: faker.random.word(),
            id: faker.datatype.number(),
            merchant: faker.random.number(),


            code: faker.finance.creditCardCVV(),
            name: faker.finance.accountName(),
            transfer: faker.datatype.boolean(),
            status: faker.datatype.boolean(),
            country: faker.address.countryCode()
        }
    }, count);
}