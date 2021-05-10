const { factory } = require("../utils");
const faker = require("faker");
faker.locale = "zh_TW";

module.exports = {
  merchantOrder: userFactory(5)
};

function userFactory(count) {
  return factory(() => {
    return {
      id: faker.datatype.number(),
      order_number: faker.datatype.number(),
      transation_number: faker.datatype.number(),
      order_amount: faker.datatype.number(),
      real_amount: faker.datatype.number(),
      fee: faker.datatype.number(),
      credit_amount: faker.datatype.number(),
      order_status: ["success", "processing", "failed"][
        Math.floor(Math.random() * 3)
      ],
      channel: `channel${Math.random() * 30}`,
      remark: faker.finance.transactionDescription(),
      audit_type: ["paid", "unpaid"][Math.floor(Math.random() * 2)],
      merchant: faker.name.firstName(),
      order_time: faker.datatype.datetime(),
      success_time: faker.datatype.datetime()
    };
  }, count);
}
