const dbMySql = require("../database/dbMySql");

const getVideogamesWithId = (qsValue) => {
  const qs = "SELECT * FROM videogames WHERE name like ? ORDER BY ? ?";
  return new Promise((resolve, reject) => {
    dbMySql.query(qs, qsValue, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getVideogamesWithId,
};
