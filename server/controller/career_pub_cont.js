var Userdb = require("../model/career_public");
const multer = require("multer");
const fs = require("fs");

const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/career_cv");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformatsofficedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid format"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

// exports.uploadImage = upload.single("cvinput");

var uploadEdit = upload.single("cvinput");

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
  console.log(req.body);
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //nEw Data
  const career_data_pub = new Userdb({
    name: req.body.name,
    email: req.body.email,
    designation: req.body.designation,
    mobile: req.body.mobile,
    cv: req.file.path,
  });

  //save data into database
  career_data_pub
    .save(career_data_pub)
    .then((career_data_pub) => {
      res.end(
        "Thanks for showing interest in Trividha.. We'll get back to you soon..!!"
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while creating",
      });
    });
};

// //create and save new raw_herb
// exports.create = (req, res) => {
//   //validate request
//   if (!req.body) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }
//   //nEw Data
//   const career_data_pub = new Userdb({
//     name: req.body.name,
//     email: req.body.email,
//     designation: req.body.designation,
//     mobile: req.body.mobile,
//   });

//   //save data into database
//   career_data_pub
//     .save(career_data_pub)
//     .then((career_data_pub) => {
//       res.end("Data uploaded");
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some errror occured while creating",
//       });
//     });
// };

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
      .then((career_data_pubs) => {
        res.send(career_data_pubs);
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
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update data with ${id}`,
        });
      } else {
        res.send(data);
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
