const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
const { response } = require("express");

var schema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
  products: [
    {
      productId: String,
      quantity: Number,
      name: String,
      price: Number,
      discount: Number,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//for token generation
schema.methods.generateAuthToken = async function () {
  try {
    const token = jwtoken.sign(
      { _id: this._id.toString() },
      process.env.KEY_SEC_TOKEN,
      {
        expiresIn: "24 hours",
      }
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    console.log("hii 53 signup");
    return token;
  } catch (err) {
    response.send("some Error", +err);
    console.log(err);
  }
};

//edit user
schema.methods.generateAuthTokenEdit = async function () {
  try {
    console.log(this);
    const token = jwtoken.sign(
      { _id: this._id.toString() },
      process.env.KEY_SEC_TOKEN,
      {
        expiresIn: "24 hours",
      }
    );

    this.tokens = this.tokens.concat({ token });

    // this.fname = this.fname.concat(this.fname);
    // console.log(this);

    await this.save();
    console.log("hii 53 signup");
    return token;
  } catch (err) {
    // res.send("some Error", +err);
    console.log(err);
  }
};

//For hashing
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("65 " + this.password);
    this.password = await bcrypt.hash(this.password, 10);
    this.confirm_password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Userdb = mongoose.model("signup", schema);

module.exports = Userdb;
