const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.delete("/devs/:github_username", DevController.destroy);
routes.put("/devs", DevController.update);

routes.get("/search", SearchController.index);

module.exports = routes;
