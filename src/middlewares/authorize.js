const jwt = require("jsonwebtoken");
const { writeError } = require("../helpers/response");

const managerOnly = (req, res, next) => {
  const token = req.header("x-access-token").split(" ")[1];
  //   console.log(token);
  //   const decodedToken = jwt.decode(token, { complete: true });
  //   console.log(decodedToken);
  //   if (decodedToken.payload.role === "Manager") return next();
  //   writeError(res, 403, { msg: "Forbidden" });
  const options = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, options, (err, decodedToken) => {
    // console.log(err);
    if (err && err.name === "TokenExpiredError")
      return writeError(res, 401, err);
    if (err && err.name === "JsonWebTokenError")
      return writeError(res, 400, err);
    // console.log(decodedToken);
    if (decodedToken.role === "Manager") return next();

    writeError(res, 403, { msg: "Forbidden" });
    // if (decodedToken.payload.role === "Manager") return next();
  });
};

const VIPOnly = (req, res, next) => {
  const token = req.header("x-access-token").split(" ")[1];
  //   console.log(token);
  const decodedToken = jwt.decode(token, { complete: true });
  //   console.log(decodedToken);
  if (decodedToken.payload.role === "VIP") return next();
  writeError(res, 403, { msg: "Forbidden" });
};

module.exports = {
  managerOnly,
  VIPOnly,
};
