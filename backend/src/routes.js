const routes = require("express").Router();

// Middleware
const authMiddleware = require("./app/middleware/auth");

// Controllers
const SessionController = require("./app/controllers/Session");
const DashboardController = require("./app/controllers/Dashboard");

routes.post("/sessions", SessionController.store);

// start using middleware at this point
routes.use(authMiddleware);
routes.get("/dashboard", DashboardController.index);

module.exports = routes;
