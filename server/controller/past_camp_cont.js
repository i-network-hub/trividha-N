var Userdb = require("../model/past_camp");
const multer = require("multer");
const fs = require("fs");

const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/pastCamps");
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
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: fileFilter,
});

// exports.uploadImage = upload.single("image");
// exports.uploadImage = upload.array("image", 10);

var uploadEdit = upload.array("image", 10);

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

  let imageFiles = [];
  req.files.forEach((element) => {
    imageFiles.push(element.path);
  });

  //nEw Data
  const past_camp_data = new Userdb({
    heading: req.body.heading,
    overview: req.body.overview,
    challenge: req.body.challenge,
    solution: req.body.solution,
    highlights: req.body.highlights,
    image: imageFiles,
  });

  //save data into database
  past_camp_data
    .save(past_camp_data)
    .then((past_camp_data) => {
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
      .then((past_camp_datas) => {
        res.send(past_camp_datas);
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
  console.log(req.body);

  uploadEdit(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    // res.end("File is uploaded");

    console.log(req.body);

    let past_camp_data;

    if (req.files != "") {
      let imageFiles = [];
      req.files.forEach((element) => {
        imageFiles.push(element.path);
      });
      past_camp_data = {
        heading: req.body.heading,
        overview: req.body.overview,
        challenge: req.body.challenge,
        solution: req.body.solution,
        highlights: req.body.highlights,
        image: imageFiles,
      };
    } else {
      past_camp_data = {
        heading: req.body.heading,
        overview: req.body.overview,
        challenge: req.body.challenge,
        solution: req.body.solution,
        highlights: req.body.highlights,
      };
    }

    console.log(past_camp_data);

    Userdb.findByIdAndUpdate(id, past_camp_data, {
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
