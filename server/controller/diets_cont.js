var Userdb = require("../model/diets");

const multer = require("multer");
const fs = require("fs");

const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/diets/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid format"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    // fileSize: 1024 * 1024 * 1,
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: fileFilter,
});

// exports.uploadImage = upload.single("image");
var uploadEdit = upload.single("image");

exports.uploadImage = (req, res, next) => {
  uploadEdit(req, res, function (err) {
    if (err) {
      console.log(err.message);
      // An error occurred when uploading
      res.status(400).send({ message: err.message });
      return;
    }
    next();
    // Everything went fine
  });
};

exports.create = (req, res) => {
  console.log(req.file);
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //nEw Data
  const diet_data = new Userdb({
    name: req.body.name,
    content: req.body.content,
    image: req.file.path,
  });

  //save data into database
  diet_data
    .save(diet_data)
    .then((diet_data) => {
      // res.send(diet_data);
      // res.json(diet_data);
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
      .then((diet_datas) => {
        res.send(diet_datas);
      })
      .catch((err) => {
        console.log("57 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  }
};

//Edit raw_herbs
exports.update = (req, res) => {
  if (!req.body && !req.params.id) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  uploadEdit(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    // res.end("File is uploaded");

    let diet_data;

    if (req.file) {
      diet_data = {
        name: req.body.name,
        content: req.body.content,
        image: req.file.path,
      };
    } else {
      diet_data = {
        name: req.body.name,
        content: req.body.content,
      };
    }

    Userdb.findByIdAndUpdate(id, diet_data, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update data with ${id}`,
          });
        } else {
          // res.send(data);
          res.end("File is uploaded");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error to Upadate data" });
      });
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
