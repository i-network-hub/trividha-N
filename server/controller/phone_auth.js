// twillo verification
const crypto = require("crypto");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;

exports.generate = (req, res) => {
  const phone = "+" + req.body.mobile;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const ttl = 2 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  client.messages
    .create({
      body: `Your One Time Login Password For Trividha is ${otp}`,
      from: twilioNum,
      to: phone,
    })
    .then((messages) => console.log(messages))
    .catch((err) => console.error(err));

  res.send({ phone, hash: fullHash, otp });

  // res.status(200).send({ phone, hash: fullHash, otp }); // this bypass otp via api only for development instead hitting twilio api all the time
  //   res.status(200).send({ phone, hash: fullHash }); // Use this way in Production
};

exports.verify = (req, res, next) => {
  const phone = "+" + req.body.mobile;
  const hash = req.body.hash;
  const otp = req.body.otp;
  let [hashValue, expires] = hash.split(".");

  let now = Date.now();
  if (now > parseInt(expires)) {
    return res.status(504).send({ msg: "Timeout. Please try again" });
  }
  let data = `${phone}.${otp}.${expires}`;
  let newCalculatedHash = crypto
    .createHmac("sha256", smsKey)
    .update(data)
    .digest("hex");
  if (newCalculatedHash === hashValue) {
    console.log("user confirmed");
    // res.status(202).send({ msg: "Device verified" });
    next();
  } else {
    return res.status(400).send({ verification: false, msg: "Incorrect OTP" });
  }
};
