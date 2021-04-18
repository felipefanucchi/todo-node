const routes = require("express").Router();

// Middleware
const authMiddleware = require("./app/middleware/auth");

// Controllers
const SessionController = require("./app/controllers/Session.controller");
const DashboardController = require("./app/controllers/Dashboard.controller");
const UserController = require("./app/controllers/User.controller");
const ProjectController = require("./app/controllers/Project.controller");

routes.get("/", (request, response) => {
  return response.send("<h1>Hello world</h1>");
});

routes.post("/session", SessionController.store);
routes.post("/user", UserController.store);

// start using middleware at this point
routes.use(authMiddleware);
routes.get("/dashboard", DashboardController.index);
routes.post("/project", ProjectController.store);

module.exports = routes;
