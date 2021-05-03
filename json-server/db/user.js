const { factory } = require("../utils");
const faker = require("faker");
faker.locale = "zh_TW";
const { roles } = require("./role");

module.exports = {
  users: userFactory(35),
};

function userFactory(count) {
  return factory(() => {
    return {
      id: faker.datatype.number(),
      signin_id: faker.internet.email(),
      role: roles[Math.floor(Math.random() * roles.length)],
      ip_allow: ["127.0.0.1"],
      phone: faker.phone.phoneNumber(),
    };
  }, count);
}
