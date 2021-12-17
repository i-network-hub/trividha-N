const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     console.log(process.env.MONGO_URI);
//     // mongodb connection
//     const con = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//     console.log(`MongoDB connected: ${con.connection.host}`);
//   } catch (err) {
//     // console.log("Line 14 connection => " + err);
//     console.log(err);
//     process.exit(1);
//   }
// };
// module.exports = connectDB;

//Connect to mongoDB using local database
const connectDB = async () => {
  try {
    // mongodb connection
    const con = await mongoose.connect("mongodb+srv://inet-ems-dummy:inet123@cluster0.nkx3t.mongodb.net/trividha?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    // console.log("Line 14 connection => " + err);
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;
