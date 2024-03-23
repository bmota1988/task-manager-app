require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretToken = "CST8333";

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, secretToken, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
