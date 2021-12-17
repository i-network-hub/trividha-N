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
  designation: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("career_public", schema);

module.exports = Userdb;
