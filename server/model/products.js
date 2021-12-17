const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  especialities: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  usage_and_benefits: {
    type: String,
    required: true,
  },
  how_to_use: {
    type: String,
    required: true,
  },
  disclaimer: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
});

// var schema = new mongoose.Schema({
//   hii: [
//     new mongoose.Schema({
//       name: {
//         type: String,
//         required: true,
//       },
//       category: {
//         type: String,
//         required: true,
//       },
//       especialities: {
//         type: String,
//         required: true,
//       },
//       content: {
//         type: String,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       discount: {
//         type: Number,
//         required: true,
//       },
//       ingredients: {
//         type: String,
//         required: true,
//       },
//       usage_and_benefits: {
//         type: String,
//         required: true,
//       },
//       how_to_use: {
//         type: String,
//         required: true,
//       },
//       disclaimer: {
//         type: String,
//         required: true,
//       },
//       image: {
//         type: String,
//         required: true,
//       },
//     }),
//   ],
// });

const Userdb = mongoose.model("products", schema);

module.exports = Userdb;
