const Router = require("express").Router();

const paramsHandler = require("../handlers/params");
const authorize = require("../middlewares/authorize");

// params => path params(:), query params(?)
Router.get("/", authorize.managerOnly, paramsHandler.getAllVideogames);
Router.get("/:id", authorize.VIPOnly, paramsHandler.getVideogamesWithId);

module.exports = Router;
