const Router = require("express").Router();

const usersHandler = require("../handlers/users");

Router.get("/", usersHandler.getUsersWithRole);

module.exports = Router;
