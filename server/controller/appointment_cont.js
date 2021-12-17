var Userdb = require("../model/appointment");

//create and save new raw_herb
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //nEw Data
  const contact_data = new Userdb({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    purpose: req.body.purpose,
  });

  //save data into database
  contact_data
    .save(contact_data)
    .then((contact_data) => {
      res.end(
        "Appointment Booked Successfully.! We'll get back to you soon.!!"
      );
      // res.redirect("/doctor");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while creating",
      });
    });
};

//Edit Status
exports.status_is = (req, res) => {
  let action_update = { action: req.query.action };
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

//retrive and return all data as ell ass single one
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Data not found" });
        } else {
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
      .then((contact_datas) => {
        res.send(contact_datas);
      })
      .catch((err) => {
        console.log("57 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  }
};

//Delete raw herb
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
