const { response } = require("express");
const jwtoken = require("jsonwebtoken");
const signup = require("../model/signup");

// const auth = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwttoken;
//     console.log("line 7 auth " + token);
//     console.log(process.env.KEY_SEC_TOKEN);
//     const verifyUser = jwtoken.verify(token, process.env.KEY_SEC_TOKEN);

//     console.log("auth 9 " + verifyUser);

//     const user = await signup.findOne({ _id: verifyUser._id });
//     console.log(user);

//     req.token = token;
//     req.user = user;

//     next();
//   } catch (err) {
//     res.status(401).send(err);
//   }
// };

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    console.log("Token is : " + token);
    if (token) {
      const verifyUser = jwtoken.verify(token, process.env.KEY_SEC_TOKEN);
      const user = await signup.findOne({ _id: verifyUser._id });
      req.token = token;
      req.user = user;
      next();
    } else {
      if (req.originalUrl == "/api/cart")
        res.status(401).send({ verification: false, msg: "Login First" });
      else {
        res.render("public/log_in");
      }
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = auth;
