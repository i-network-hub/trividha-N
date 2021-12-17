const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // qunique: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  action: { type: Boolean, default: false },
});

const Userdb = mongoose.model("appointment", schema);

module.exports = Userdb;
