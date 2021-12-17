var Userdb = require("../model/return");

//create and save new return
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //nEw Data
  const return_data = new Userdb({
    heading: req.body.heading,
    content: req.body.content,
  });

  //save data into database
  return_data
    .save(return_data)
    .then((return_data) => {
      res.end("Data uploaded");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while creating",
      });
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
      .then((return_data) => {
        res.send(return_data);
      })
      .catch((err) => {
        console.log("57 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  }
};

//Edit returns
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;

  let return_data = {
    heading: req.body.heading,
    content: req.body.content,
  };

  Userdb.findByIdAndUpdate(id, return_data, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update data with ${id}`,
        });
      } else {
        // res.send(data);
        res.end("Data Updated Successfully");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to Upadate data" });
    });
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
