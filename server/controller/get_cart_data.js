const { response } = require("express");
const jwtoken = require("jsonwebtoken");
const signup = require("../model/signup");
const cart_data = require("../model/cart");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    console.log("Token in get_cart_data is : " + token);
    if (token) {
      const verifyUser = jwtoken.verify(token, process.env.KEY_SEC_TOKEN);
      const user = await signup.findOne({ _id: verifyUser._id });
      //   req.token = token;
      //   req.user = user;

      const id = user._id;
      console.log(id); //60cb49ec5e3d268bb2d9fd1f
      cart_data
        .findOne({ userId: verifyUser._id })
        .then((data) => {
          if (!data) {
            // res.status(404).send({ message: "Data not found" });
            req.cart_data_val = 0;
            next();
          } else {
            req.cart_data_val = data.products.length;
            next();
          }
        })
        .catch((err) => {
          console.log("44 => " + err);
          res.status(500).send({
            message: err.message || "Some error occured while retriving",
          });
        });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = auth;
