// const express = require("express");
// const Router = express.Router();
const Router = require("express").Router();

// const dbMySql = require("./src/database/dbMySql");
const pingRouter = require("./ping");
const usersRouter = require("./users");
const videogamesRouter = require("./videogames");
const productRouter = require("./product");
const authRouter = require("./auth");
const multerUploadImage = require("../middlewares/uploadImage");
// const mid1 = require("../middlewares/mid1");
// const mid2 = require("../middlewares/mid2");

Router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "x-access-token");
    return res.sendStatus(200);
  }
  next();
  // res.send(200);
});
// config router
// use subRouter
// Router.use("/ping", mid1, mid2, pingRouter);
Router.use("/ping", pingRouter);
Router.use("/users", usersRouter);
Router.use("/videogames", videogamesRouter);
Router.use("/product", productRouter);
Router.use("/auth", authRouter);

Router.post("/", (req, res) => {
  //  console.log(req.body);
  res.send(req.body);
});

Router.post("/upload", multerUploadImage.single("image"), (req, res) => {
  const { file } = req;
  const url = `/images/${file.filename}`;
  res.status(200).json({
    msg: "Upload Success",
    url,
  });
});

const authMiddleware = require("../middlewares/authorize");
Router.get("/", authMiddleware.byRole("Manager"), (req, res) => {
  res.json({ msg: "Hello" });
});

module.exports = Router;
