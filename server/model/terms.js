const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("terms", schema);

module.exports = Userdb;
