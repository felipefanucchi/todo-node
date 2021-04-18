const faker = require("faker");
const { factory } = require("factory-girl");
const { User, Project, Task } = require("../src/app/models");

factory.define("User", User, {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define("Project", Project, {
  name: faker.company.companyName(),
});

factory.define("Task", Task, {
  description: faker.commerce.productDescription(),
  finishDate: faker.date.future(),
  ProjectId: faker.datatype.uuid(),
});

module.exports = factory;
