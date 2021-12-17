var Userdb = require("../model/cart");
var Users = require("../model/signup");

exports.workwithcart_kk = async (req, res) => {
  const { productId, quantity, name, price, discount, userId } = req.body;
  console.log(req.user);
  // console.log(data);
  //cart exists for user
  let itemIndex = req.user.products.findIndex((p) => p.productId == productId);

  if (itemIndex > -1) {
    //product exists in the cart, update the quantity
    console.log("product exists");
    console.log(quantity);

    if (quantity == "0") {
      console.log(req.user.products[itemIndex]);
      // delete req.user.products[itemIndex];
      req.user.products[itemIndex].remove();
    } else {
      let productItem = data.products[itemIndex];
      productItem.quantity = quantity;
      req.user.products[itemIndex] = productItem;
    }
  } else {
    //product does not exists in cart, add new item
    console.log("product doesnt exists");
    req.user.products.push({ productId, quantity, name, price, discount });
  }
  console.log(req.user);
  //save data into database
  Userdb.save(req.user)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while creating",
      });
    });

  Users.findByIdAndUpdate(req.user._id, req.user, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update data with ${data._id}`,
        });
      } else {
        // res.clearCookie("jwttoken");
        // res.render("public/sign_up");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to Upadate data" });
    });
};

exports.workwithcart = async (req, res) => {
  const { productId, quantity, name, price, discount } = req.body;
  const userId = req.user._id;

  Userdb.findOne({ userId })
    .then((data) => {
      if (data) {
        // console.log(data);
        //cart exists for user
        let itemIndex = data.products.findIndex(
          (p) => p.productId == productId
        );

        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          if (quantity == "0") {
            // delete data.products[itemIndex];
            data.products[itemIndex].remove();
          } else {
            let productItem = data.products[itemIndex];
            productItem.quantity = quantity;
            productItem.total_price = productItem.price * quantity;
            data.products[itemIndex] = productItem;
          }
        } else {
          //product does not exists in cart, add new item
          data.products.push({
            productId,
            quantity,
            name,
            price,
            discount,
            total_price: price * quantity,
          });
        }
        //save data into database
        data
          .save(data)
          .then((data_get) => {
            res.status(201).send(data_get);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some errror occured while creating",
            });
          });
      } else {
        //no cart for user, create new cart
        const newCart = Userdb({
          userId,
          products: [
            {
              productId,
              quantity,
              name,
              price,
              discount,
              total_price: price * quantity,
            },
          ],
        });

        newCart
          .save(newCart)
          .then((newCart) => {
            res.status(201).send(newCart);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "Some errror occured while creating",
            });
          });
      }
    })
    .catch((err) => {
      console.log("44 => " + err);
      res.status(500).send({
        message: err.message || "Some error occured while retriving",
      });
    });
};

exports.find = (req, res) => {
  //   const userId = "5de7ffa74fff640a0491bc4f";

  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Data not found" });
        } else {
          console.log("line 142" + data);
          res.send(data);
        }
      })
      .catch((err) => {
        console.log("44 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  } else {
    Userdb.find()
      .then((allData) => {
        res.send(allData);
      })
      .catch((err) => {
        console.log("57 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete with id ${id}` });
      } else {
        res.send({
          message: "Data deleted Successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to Delete data" });
    });
};
