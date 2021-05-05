let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    cardHolders: cardHolderFactory(30),
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