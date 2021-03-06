const routes = require("express").Router();

// Middleware
const authMiddleware = require("./app/middleware/auth");

// Controllers
const SessionController = require("./app/controllers/Session.controller");
const DashboardController = require("./app/controllers/Dashboard.controller");
const UserController = require("./app/controllers/User.controller");
const ProjectController = require("./app/controllers/Project.controller");
const TaskController = require("./app/controllers/Task.controller");

routes.get("/", (request, response) => {
  return response.send("<h1>Hello world</h1>");
});

routes.post("/session", SessionController.store);
routes.post("/user", UserController.store);

// start using middleware at this point
routes.use(authMiddleware);
routes.get("/dashboard", DashboardController.index);
// User authed routes
routes.get("/user/me", UserController.show);
// Projects Routes
routes.post("/project", ProjectController.store);
routes.put("/project/:id", ProjectController.update);
routes.delete("/project/:id", ProjectController.delete);
// Task Routes
routes.post("/task", TaskController.store);
routes.put("/task/:id", TaskController.update);
routes.delete("/task/:id", TaskController.delete);

module.exports = routes;
