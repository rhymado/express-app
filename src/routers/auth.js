const Router = require("express").Router();

const authHandler = require("../handlers/auth");
// Router.get("/", (_, res) => {
//   res.json({
//     message: "auth",
//   });
// });

// login
Router.post("/login", authHandler.login);

// register
Router.post("/register", authHandler.register);

// logout
Router.delete("/logout", (req, res) => {});

module.exports = Router;
