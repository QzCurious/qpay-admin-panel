const { factory } = require("../utils");
const faker = require("faker");
faker.locale = "zh_TW";

module.exports = {
  "roles": userFactory(5),
};

function userFactory(count) {
  return factory(() => {
    return {
      id: faker.datatype.number(),
      name: faker.name.jobTitle(),
    };
  }, count);
}
