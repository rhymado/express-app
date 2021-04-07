const mysql = require("mysql");

const videogamesModel = require("../models/videogames");
const {
  writeError,
  writeResponse,
  writeResponsePaginated,
} = require("../helpers/response");

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
  videogamesModel
    .getVideogamesWithId(qsValue)
    .then((result) => {
      writeResponse(res, null, 200, result);
    })
    .catch((err) => {
      if (err) writeError(res, 500, err);
    });
};

const getAllVideogames = (req, res) => {
  videogamesModel
    .getAllVideogames()
    .then((result) => writeResponse(res, null, 200, result))
    .catch((err) => writeError(res, 500, err));
};

const getAllVideogamesWithPagination = (req, res) => {
  const { query, baseUrl, path, hostname, protocol } = req;
  videogamesModel
    .getAllVideogamesWithPagination(query)
    .then((finalResult) => {
      const { result, count, page, limit } = finalResult;
      const totalPage = Math.ceil(count / limit);
      // count limit total
      // 8      3     3
      // 10     4     3
      const url =
        protocol + "://" + hostname + ":" + process.env.PORT + baseUrl + path;
      const prev =
        page === 1 ? null : url + `?page=${page - 1}&limit=${query.limit || 3}`;
      const next =
        page === totalPage
          ? null
          : url + `?page=${page + 1}&limit=${query.limit || 3}`;
      const info = {
        count,
        page,
        totalPage,
        next,
        prev,
      };
      writeResponsePaginated(res, 200, result, info);
    })
    .catch((err) => {
      console.log(err);
      writeError(res, 500, err);
    });
};

module.exports = {
  getVideogamesWithId,
  getAllVideogames,
  getAllVideogamesWithPagination,
};
