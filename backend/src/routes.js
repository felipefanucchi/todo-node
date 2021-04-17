const routes = require("express").Router();

// Controllers
const SessionController = require("./app/controllers/Session");

routes.post("/sessions", SessionController.store);

module.exports = routes;
