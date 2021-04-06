const mysql = require("mysql");

const paramsModel = require("../models/params");
const { writeError, writeResponse } = require("../helpers/response");

const getVideogamesWithId = (req, res) => {
  //   const path = req.params;
  const { search, sort } = req.query;
  const searchValue = "%" + search + "%";
  const sortValue = sort.split("-").map((q) => {
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
  // console.log(qsValue);
  paramsModel
    .getVideogamesWithId(qsValue)
    .then((result) => {
      writeResponse(res, null, 200, result);
    })
    .catch((err) => {
      if (err) writeError(res, 500, err);
    });
};

const getAllVideogames = (req, res) => {
  paramsModel
    .getAllVideogames()
    .then((result) => writeResponse(res, null, 200, result))
    .catch((err) => writeError(res, 500, err));
};

module.exports = {
  getVideogamesWithId,
  getAllVideogames,
};
