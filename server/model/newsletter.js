const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("newsletter", schema);

module.exports = Userdb;
