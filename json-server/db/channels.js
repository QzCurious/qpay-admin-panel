let { factory } = require('../utils');
let faker = require('faker');
faker.locale = 'zh_TW';

module.exports = { 
    channels: channelFactory(30),
}

function channelFactory(count) {
    return factory( _ => {
        let cards = [
            faker.vehicle.model(),
            faker.vehicle.model(),
            faker.vehicle.model(),
            faker.vehicle.model()
        ];
        cards = cards.filter(x => x = Math.floor(Math.random() * 2) ? x : '');

        return { 
            id: faker.datatype.number(),
            name: faker.hacker.abbreviation(),
            status: faker.datatype.boolean(),
            cards: cards
        }
    }, count);
}