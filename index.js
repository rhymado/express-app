require("dotenv").config();
// import express from 'express';
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const Router = require("./src/routers/router");

//init express app
const app = express();
// config express
// listen
app.listen(process.env.PORT, () => {
  console.log("Server Running at Port", process.env.PORT);
});

// middleware untuk parsing body
// content-type = application/json
// body json
const jsonParser = express.json();
// content-type = application/x-www-form-urlencoded
// body x-www-form-urlencoded
const urlEncodedParser = express.urlencoded({ extended: false });
// false => parsing menggunakan library qs
// true => parsing menggunakan library querystring

app.use(logger("dev"));
app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);
// use router
app.use(Router);
