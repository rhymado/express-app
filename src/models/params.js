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

const getAllVideogames = () => {
  return new Promise((resolve, reject) => {
    const qs =
      'SELECT v.id, v.name, v.price, GROUP_CONCAT(c.category SEPARATOR ", ") AS "category" FROM videogames v JOIN videogame_category vc ON v.id = vc.game_id JOIN categories c ON vc.category_id = c.id GROUP BY v.id ORDER BY v.id';
    dbMySql.query(qs, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getVideogamesWithId,
  getAllVideogames,
};
