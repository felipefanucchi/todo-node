const routes = require("express").Router();

// Middleware
const authMiddleware = require("./app/middleware/auth");

// Controllers
const SessionController = require("./app/controllers/Session.controller");
const DashboardController = require("./app/controllers/Dashboard.controller");
const UserController = require("./app/controllers/User.controller");

routes.post("/sessions", SessionController.store);
routes.post("/user", UserController.store);

// start using middleware at this point
routes.use(authMiddleware);
routes.get("/dashboard", DashboardController.index);

module.exports = routes;
