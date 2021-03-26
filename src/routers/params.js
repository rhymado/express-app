const Router = require("express").Router();

const paramsHandler = require("../handlers/params");

// params => path params(:), query params(?)
Router.get("/:id", paramsHandler.getVideogamesWithId);

module.exports = Router;
