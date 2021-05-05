let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    cardOperations: [
        {
            id: 1,
            merchant: 'merchant01',
            bank_name: 'kbank',
            account_name: 'tony_chen',
            card_number: '1122334455',
            limit_deposit: {
                income_today: 20000,
                deposit_today: 20000,
                remaining: 0
            }, 
            limit_daily: 20000,
            current_balance: 66655.12,
            online: true
        },
        {
            id: 2,
            merchant: 'merchant02',
            bank_name: 'siambank',
            account_name: 'jimmy_wang',
            card_number: '9987536',
            limit_deposit: {
                income_today: 30000,
                deposit_today: 30000,
                remaining: 0
            }, 
            limit_daily: 30000,
            current_balance: 16623.45,
            online: true
        }
    ]
    
}

function cardHolderFactory(count) {
    return factory( _ => {
        let cards = [
            faker.finance.account(),
            faker.finance.account(),
            faker.finance.account(),
            faker.finance.account(),
            faker.finance.account(),
        ];
        cards = cards.filter(x => x = Math.floor(Math.random() * 2) ? x : '');
        return { 
            id: faker.datatype.number(),
            name: faker.internet.userName(),
            status: faker.datatype.boolean(),
            cards: cards,
            phone: faker.phone.phoneNumber()
        }
    }, count);
}