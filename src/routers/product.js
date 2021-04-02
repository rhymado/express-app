const Router = require("express").Router();

const productDb = require("../database/productDb");
const { writeResponse, writeError } = require("../helpers/response");

const productModel = (body) => {
  return new Promise((resolve, reject) => {
    const qs = "INSERT INTO products SET ?";
    productDb.query(qs, body, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

Router.post("/", (req, res) => {
//   console.log(req.headers);
  const {
    product_name,
    product_description,
    product_price,
    category_id,
    product_qty,
  } = req.body;
  // error handling
  if (
    !product_description ||
    !product_name ||
    !product_price ||
    !category_id ||
    !product_qty
  ) {
    return writeError(res, 400, { message: "Missing Fields" });
  }
  // query
  const header = { "Access-Control-Allow-Origin": "*" };
  productModel(req.body)
    .then((result) => {
      const newResult = { ...req.body, id: result.insertId };
      writeResponse(res, header, 201, { result: newResult });
    })
    .catch((err) => {
      writeError(res, 500, { message: err });
    });
});

module.exports = Router;
