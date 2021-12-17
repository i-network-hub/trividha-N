const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("product_cat", schema);

module.exports = Userdb;
