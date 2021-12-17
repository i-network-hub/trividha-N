const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    // qunique: true,
  },
  message: {
    type: String,
    required: true,
  },
  herbs: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("quote", schema);

module.exports = Userdb;
