var Userdb = require("../model/orders");
const axios = require("axios");

var UserdbCart = require("../model/cart");
const cart_cont = require("./cart_cont");

const payment = require("./payment");

// let deleteCart = cart_cont.delete;

exports.placeorder = async (req, res, next) => {
  //   const { productId, quantity, name, price, discount, userId } = req.body;
  console.log(req.query.id);
  console.log(req.body);

  if (req.query.id) {
    ////Make a get request to /api/cart
    axios
      .get(`https://trividhaa.herokuapp.com/api/cart?id=${req.query.id}`)
      .then(function (response) {
        console.log(response.data.products);
        let totalprice = 0;
        response.data.products.forEach((element) => {
          totalprice = totalprice + element.price * element.quantity;
        });

        //nEw Data
        const orderData = new Userdb({
          userId: response.data.userId,
          orderName: req.body.name,
          orderNotes: "Notes",
          mobileNumber: req.body.mobile,
          email: req.body.email,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          totalPrice: req.body.totalPrice,
          // products:,
          // quantity: ,
          // totalPrice: Number,
          products: response.data.products,
          // promoCode: ,
          // delivered: ,
          razorpay_order_id: req.body.razorpay_order_id,
          razorpay_payment_id: req.body.razorpay_payment_id,
          razorpay_signature: req.body.razorpay_signature,
        });

        //save data into database
        orderData
          .save(orderData)
          .then((orderData) => {
            console.log("order_cont" + orderData);

            UserdbCart.findByIdAndDelete(req.query.id)
              .then((data) => {
                if (!data) {
                  res
                    .status(404)
                    .send({ message: `Cannot delete with id ${id}` });
                } else {
                  console.log("order_cont_60_ " + data);
                  // res.send(orderData);
                  next();
                }
              })
              .catch((err) => {
                res.status(500).send({ message: "Error to Delete data" });
              });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some errror occured while creating",
            });
          });
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    Userdb.find()
      .then((orders) => {
        console.log("sending data if id is not avilable");
        res.send(orders);
      })
      .catch((err) => {
        console.log("57 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  }
};

//Edit Status
exports.edit_status = (req, res) => {
  let action_update = { delivered: req.query.action };
  Userdb.findByIdAndUpdate(req.query.id, action_update, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update data with ${id}`,
        });
      } else {
        console.log(data);
        res.send(data);
        // res.redirect("/admin/appointment");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to Upadate data" });
    });
};
