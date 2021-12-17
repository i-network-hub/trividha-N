const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // qunique: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("career", schema);

module.exports = Userdb;
