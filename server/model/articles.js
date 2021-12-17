const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  image: [
    {
      type: String,
    },
  ],
});

const Userdb = mongoose.model("articles", schema);

module.exports = Userdb;
