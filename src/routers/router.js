// const express = require("express");
// const Router = express.Router();
const Router = require("express").Router();

// const dbMySql = require("./src/database/dbMySql");
const pingRouter = require("./ping");
const usersRouter = require("./users");
const paramsRouter = require("./params");

// const mid1 = require("../middlewares/mid1");
// const mid2 = require("../middlewares/mid2");

// config router
// use subRouter
// Router.use("/ping", mid1, mid2, pingRouter);
Router.use("/ping", pingRouter);
Router.use("/users", usersRouter);
Router.use("/params", paramsRouter);

Router.post("/", (req, res) => {
  //  console.log(req.body);
  res.send(req.body);
});

module.exports = Router;
