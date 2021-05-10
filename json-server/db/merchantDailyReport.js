let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    merchantDailyReport: [
        {
            date: faker.date.past(),
            merchant: 'merchant01',
            channel: 'channel01',
            deposit_amount: faker.datatype.number(),
            deposit_fee: faker.datatype.number(),
            deposit_count: faker.datatype.number(),
            auto_deposit: faker.datatype.number(),
            manual_deposit: faker.datatype.number(),
            total_deposit: faker.datatype.number(),
            deposit_count:  faker.datatype.number(),
            recharge_amount: faker.datatype.number(),
            recharge_fee: faker.datatype.number(),
            deduction_amount: faker.datatype.number(),
            deduction_fee: faker.datatype.number(),
            opening_balance: faker.datatype.number(),
            ending_balance: faker.datatype.number()
        },
        {
            date: faker.date.past(),
            merchant: 'merchant01',
            channel: 'channel02',
            deposit_amount: faker.datatype.number(),
            deposit_fee: faker.datatype.number(),
            deposit_count: faker.datatype.number(),
            auto_deposit: faker.datatype.number(),
            manual_deposit: faker.datatype.number(),
            total_deposit: faker.datatype.number(),
            deposit_count:  faker.datatype.number(),
            recharge_amount: faker.datatype.number(),
            recharge_fee: faker.datatype.number(),
            deduction_amount: faker.datatype.number(),
            deduction_fee: faker.datatype.number(),
            opening_balance: faker.datatype.number(),
            ending_balance: faker.datatype.number()
        },
        {
            date: faker.date.past(),
            merchant: 'merchant02',
            channel: 'channel03',
            deposit_amount: faker.datatype.number(),
            deposit_fee: faker.datatype.number(),
            deposit_count: faker.datatype.number(),
            auto_deposit: faker.datatype.number(),
            manual_deposit: faker.datatype.number(),
            total_deposit: faker.datatype.number(),
            deposit_count:  faker.datatype.number(),
            recharge_amount: faker.datatype.number(),
            recharge_fee: faker.datatype.number(),
            deduction_amount: faker.datatype.number(),
            deduction_fee: faker.datatype.number(),
            opening_balance: faker.datatype.number(),
            ending_balance: faker.datatype.number()
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