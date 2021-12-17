//cros and crypto for razorpay payment
const crypto = require("crypto");
const Razorpay = require("razorpay");

const services = require("../services/render");

//for payment starts
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// exports.order = (req, res) => {
//     // var options = {
//     //     amount: 50000,
//     //     currency: "INR",
//     //     receipt: "order_rcptid_11"
//     //   };
//   params = req.body;
//   instance.orders
//     .create(params)
//     .then((data) => {
//       res.send({ sub: data, status: "success" });
//     })
//     .catch((error) => {
//       res.send({ sub: error, status: "failed" });
//     });
// };
exports.order = (req, res) => {
  // var options = {
  //     amount: 50000,
  //     currency: "INR",
  //     receipt: "order_rcptid_11"
  //   };
  params = req.body;
  console.log(params);
  instance.orders
    .create(params)
    .then((data) => {
      console.log("payment order" + data);
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
};

// exports.verify = (req, res) => {
//   body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
//   let expectedSignature = crypto
//     .createHmac("sha256", process.env.KEY_SECRET)
//     .update(body.toString())
//     .digest("hex");
//   console.log("sig" + req.body.razorpay_signature);
//   console.log("sig" + expectedSignature);
//   let response = { status: "failure" };
//   if (expectedSignature === req.body.razorpay_signature)
//     response = { status: "Success" };
//   res.send(response);
// };

exports.verify = async (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  let expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  let response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "Success" };
  console.log("payment verify" + response);
  res.send(response);
};
