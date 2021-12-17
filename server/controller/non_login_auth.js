const { response } = require("express");
const jwtoken = require("jsonwebtoken");
const signup = require("../model/signup");

const non_login_auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    console.log(token);
    if (token) {
      const verifyUser = jwtoken.verify(token, process.env.KEY_SEC_TOKEN);
      const user = await signup.findOne({ _id: verifyUser._id });
      req.token = token;
      req.user = user;
      next();
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = non_login_auth;
