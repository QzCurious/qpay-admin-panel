let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    depositDailyReport: [
        {
            merchant: 'merchant01',
            bank: 'HSBC',
            card_id: 1001,
            card_number: faker.finance.account(),
            account_name: faker.finance.accountName(),
            current_balance: faker.datatype.number(),
            auto_deposit: faker.datatype.number(),
            manual_deposit: faker.datatype.number(),
            total_deposit: faker.datatype.number(),
            deposit_count: faker.datatype.number(),
        }, 
        {
            merchant: 'merchant02',
            bank: 'CBC',
            card_id: 1002,
            card_number: faker.finance.account(),
            account_name: faker.finance.accountName(),
            current_balance: faker.datatype.number(),
            auto_deposit: faker.datatype.number(),
            manual_deposit: faker.datatype.number(),
            total_deposit: faker.datatype.number(),
            deposit_count: faker.datatype.number(),
        }, 
        {
            merchant: 'merchant03',
            bank: 'KBANK',
            card_id: 1003,
            card_number: faker.finance.account(),
            account_name: faker.finance.accountName(),
            current_balance: faker.datatype.number(),
            auto_deposit: faker.datatype.number(),
            manual_deposit: faker.datatype.number(),
            total_deposit: faker.datatype.number(),
            deposit_count: faker.datatype.number(),
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