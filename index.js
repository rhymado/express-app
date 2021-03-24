require("dotenv").config();
// import express from 'express';
const express = require("express");

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
const urlEncodedParser = express.urlencoded();

app.use(jsonParser);
app.use(urlEncodedParser);

// use router
const Router = express.Router();
app.use(Router);

// declare middleware
const mid1 = (req, res, next) => {
  req.customVar = "pong";
  console.log("middleware 1");
  next();
};
const mid2 = (req, res, next) => {
  console.log("middleware 2");
  console.log(req.customVar);
  next();
};

// init db
const mysql = require("mysql");
// config db
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
};

// init connection
const db = mysql.createConnection(config);

// config router
Router.get("/ping", mid1, mid2, (req, res) => {
  console.log("pong");
  res.status(204).send();
});

Router.post("/", (req, res) => {
  //  console.log(req.body);
  res.send(req.body);
});

Router.get("/users", (req, res) => {
  const qs = `SELECT u.id, u.name AS "username", r.name AS "role" FROM users u JOIN roles r ON u.role_id = r.id ORDER BY u.id ASC`;
  db.query(qs, (err, result) => {
    if (err) res.status(500).json(new Error(err));
    const response = {
      success: true,
      result,
    };
    res
      .header("Access-Control-Allow-Origin", "http://localhost:3000")
      .status(200)
      .json(response);
  });
  //   try {
  //     const result = await db.query(qs);
  //     const response = {
  //       success: true,
  //       data: result,
  //     };
  //     res.status(200).json(response);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
});

// params => path params(:), query params(?)
Router.get("/params/:id", (req, res) => {
  //   const path = req.params;
  const query = req.query;
  const qs = "SELECT * FROM videogames WHERE name like ? ORDER BY ? ?";
  //   const qs1 = `${path}`;
  const searchValue = "%" + query.search + "%";
  const sortValue = query.sort.split("-").map((q) => {
    switch (q) {
      case "AZ":
        return mysql.raw("ASC");
      case "ZA":
        return mysql.raw("DESC");
      default:
        return mysql.raw(q);
    }
  });
  const qsValue = [searchValue, ...sortValue];
  // ["price", "AZ"] => ["price","ASC"]
  //   console.log(qsValue);
  db.query(qs, qsValue, (err, result) => {
    if (err) res.status(500).json(new Error(err));
    if (err) throw err;
    const response = {
      success: true,
      data: result,
    };
    res.status(200).json(response);
  });
  //   res.send(conn.sql);
  //   res.json({
  //     path,
  //     query,
  //   });
});
