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

const getAllVideogamesWithPagination = (query) => {
  return new Promise((resolve, reject) => {
    const qs =
      'SELECT v.id, v.name, v.price, GROUP_CONCAT(c.category SEPARATOR ", ") AS "category" FROM videogames v JOIN videogame_category vc ON v.id = vc.game_id JOIN categories c ON vc.category_id = c.id GROUP BY v.id ORDER BY v.id';
    const paginate = "LIMIT ? OFFSET ?";
    const qsWithPaginate = qs.concat(" ", paginate);
    // is query.limit truthy value?
    // number 0 => falsy value
    // null | undefined | 0 | "" | false
    const limit = Number(query.limit) || 3;
    // const limit = query.limit ?? 3
    // nullish coalescence
    // null | undefined
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    // console.log(limit, page, offset);
    dbMySql.query(qsWithPaginate, [limit, offset], (err, result) => {
      if (err) return reject(err);

      const qsCount = 'SELECT COUNT(*) AS "count" FROM videogames';
      // escaped character (\) => sehingga tanda yang digunakan sebagai syntax muncul sebagai string
      dbMySql.query(qsCount, (err, data) => {
        if (err) return reject(err);

        const { count } = data[0];
        let finalResult = {
          result,
          count,
          page,
          limit,
        };
        resolve(finalResult);
      });
      // count page next prev
    });
  });
};

module.exports = {
  getVideogamesWithId,
  getAllVideogames,
  getAllVideogamesWithPagination,
};
