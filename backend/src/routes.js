const routes = require("express").Router();
const { User } = require("./app/models");

(async () => {
  const user = await User.create({
    firstName: "Felipe",
    lastName: "Fanucchi",
    password: "123456",
    email: "flfanucchi@gmail.com",
  });

  console.log(user);
})();

module.exports = routes;
