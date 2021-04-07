const Router = require("express").Router();

const videogamesHandler = require("../handlers/videogames");
const authorize = require("../middlewares/authorize");

// params => path params(:), query params(?)
Router.get("/all", videogamesHandler.getAllVideogamesWithPagination);

Router.get("/", authorize.managerOnly, videogamesHandler.getAllVideogames);

Router.get("/:id", authorize.VIPOnly, videogamesHandler.getVideogamesWithId);

module.exports = Router;
