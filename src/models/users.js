const dbMySql = require("../database/dbMySql");

const getUsersWithRole = () => {
  return new Promise((resolve, reject) => {
    const qs = `SELECT u.id, u.name AS "username", r.name AS "role" FROM users u JOIN roles r ON u.role_id = r.id ORDER BY u.id ASC`;
    dbMySql.query(qs, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getUsersWithRole,
};
