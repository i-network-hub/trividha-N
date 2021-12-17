const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  disease: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("disease_cat", schema);

module.exports = Userdb;
