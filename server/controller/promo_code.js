var Userdb = require("../model/promo");
var voucher_codes = require("voucher-code-generator");

exports.create = async (req, res) => {
  const promoCode = voucher_codes.generate({
    length: 5,
    count: 1,
  });
  console.log(promoCode);
  Userdb.create({
    discount: req.body.discount,
    discountType: req.body.discountType,
    code: promoCode[0],
  });
  res.redirect("/admin/add_promo");
};

exports.delete = async (req, res) => {
  await Userdb.deleteOne({ _id: req.params.id });
  // res.redirect("/admin/add_promo");
  res.send({
    message: "Data deleted Successfully",
  });
};

exports.find = async (req, res) => {
  if (req.query.id) {
    // var promoCode = await Userdb.findById(req.params.id);
    let promoCode = await Userdb.find({ code: req.query.id });
    // console.log("line 30" + promoCode);
    res.send(promoCode);
  } else {
    var promoCode = await Userdb.find({});
    // console.log("line 34" + promoCode);
    res.send(promoCode);
  }
};
