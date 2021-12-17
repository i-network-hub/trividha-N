var Userdb = require("../model/signup");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  if (req.body.password === req.body.confirm_password) {
    let en_password = await bcrypt.hash(req.body.password, 10);
    let current_user = await Userdb.findOne({ mobile: req.body.mobile });

    if (current_user) {
      ////upadte user
      const userData = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: en_password,
        confirm_password: en_password,
      };

      Userdb.findByIdAndUpdate(current_user._id, userData, {
        useFindAndModify: false,
      })
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot Update data with ${current_user._id}`,
            });
          } else {
            res.statusCode = 302;
            res.setHeader("Location", "/");
            res.end();
          }
        })
        .catch((err) => {
          res.status(500).send({ message: "Error to Upadate data" });
        });
    } else {
      res.status(500).send({
        message: "Sign_up.. Some errror occured while getting",
      });
    }
  } else {
    res
      .status(400)
      .send({ verification: false, msg: "Password not matched.!!" });
  }
};

exports.loginuser = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let mobile = "91" + req.body.mobile;

  Userdb.findOne({ mobile })
    .then((data) => {
      // const isMatch = bcrypt.compare(req.body.password, data.password);
      // console.log(isMatch);

      bcrypt.compare(req.body.password, data.password).then((get_status) => {
        if (get_status) {
          data
            .generateAuthToken()
            .then((getToken) => {
              res.cookie("jwttoken", getToken, {
                expires: new Date(Date.now() + 1 * 3600 * 1000),
                httpOnly: true,
                // secure: true
              });
              res.statusCode = 302;
              res.setHeader("Location", "/");
              res.end();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res
            .status(400)
            .send({ verification: false, msg: "Wrong Password.!!" });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while getting",
      });
    });
};

exports.editUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let mobile = req.body.mobile;
  let pass = await bcrypt.hash(req.body.new_password, 10);

  Userdb.findOne({ mobile })
    .then((data) => {
      const isMatch = bcrypt.compare(req.body.current_password, data.password);

      //upadte user
      const userData = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: pass,
        confirm_password: pass,
        tokens: [],
      };

      if (isMatch) {
        Userdb.findByIdAndUpdate(data._id, userData, {
          useFindAndModify: false,
        })
          .then((up_data) => {
            if (!up_data) {
              res.status(404).send({
                message: `Cannot Update data with ${up_data._id}`,
              });
            } else {
              res.clearCookie("jwttoken");
              res.render("public/sign_up");
            }
          })
          .catch((err) => {
            res.status(500).send({ message: "Error to Upadate data" });
          });
      } else {
        res.send("Invalid login Details");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while getting",
      });
    });
};

exports.user_using_otp = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let mobile = req.body.mobile;

  let isUSer = await Userdb.findOne({ mobile });

  if (isUSer) {
    //user already exists
    const token = await isUSer.generateAuthToken();
    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 1 * 3600 * 1000),
      httpOnly: true,
      // secure: true
    });
    res.status(202).send({ msg: "Phone verified", user: isUSer });
    // res.end("Login Successful");
    // console.log("Existing user logged in with token " + token);
    // res.statusCode = 302;
    // res.setHeader("Location", "https://trividhaa.herokuapp.com");
    // res.end();
  } else {
    //create new user
    const userData = new Userdb({
      mobile: req.body.mobile,
    });
    const token = await userData.generateAuthToken();

    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 1 * 3600 * 1000),
      httpOnly: true,
    });

    //save data into database
    userData
      .save(userData)
      .then((userData) => {
        console.log(userData);
        res.status(202).send({ msg: "Phone verified", user: userData });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some errror occured while creating",
        });
      });
  }
};
