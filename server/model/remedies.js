const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  remedy: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("remedies", schema);

module.exports = Userdb;
