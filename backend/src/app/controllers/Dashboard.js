// const { User } = require("../models");
class DashboardController {
  async index(request, response) {
    return response.status(200).send();
  }
}

module.exports = new DashboardController();
