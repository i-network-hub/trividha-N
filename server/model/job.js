const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Userdb = mongoose.model("job", schema);

module.exports = Userdb;
