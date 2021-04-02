// init db
const mysql = require("mysql");
// config db
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PRODUCT } = process.env;
const productDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_PRODUCT,
};

const productDbConn = mysql.createConnection(productDB);

module.exports = productDbConn;
