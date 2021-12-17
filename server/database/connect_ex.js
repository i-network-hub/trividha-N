const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://main_admin:nnms6JZsvx3NuzNI@aryatheabhishek.os7xx.mongodb.net/trividha?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("trividha").collection("devices");
  // perform actions on the collection object
  console.log("xxxxxxx", err);
  client.close();
});
