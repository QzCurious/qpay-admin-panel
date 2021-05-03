const { factory } = require("../utils");
const faker = require("faker");
faker.locale = "zh_TW";

module.exports = {
  "operation-log": operationLogFactory(35),
};

function operationLogFactory(count) {
  return factory(() => {
    return {
      signin_id: faker.internet.userName(),
      company: faker.company.companyName(),
      operation: ["登入", "註冊"][Math.floor(Math.random() * 2)],
      type: faker.finance.accountName(),
      sub_type: faker.finance.transactionType(),
      remark: faker.finance.transactionDescription(),
      action_type: faker.hacker.verb(),
      ip: faker.internet.ip(),
      timestamp: Math.floor(faker.datatype.datetime().getTime() / 1000),
    };
  }, count);
}
