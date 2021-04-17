const faker = require("faker");
const { factory } = require("factory-girl");
const { User } = require("../src/app/models");

factory.define("User", User, {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

module.exports = factory;
