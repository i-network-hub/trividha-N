const mongoose = require("mongoose");
var schema = new mongoose.Schema({
  discount: Number,
  discountType: String,
  code: String,
});

const Userdb = mongoose.model("promo", schema);
module.exports = Userdb;
