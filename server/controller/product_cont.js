var Userdb = require("../model/products");
const multer = require("multer");
const fs = require("fs");

const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
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
  const product_data = new Userdb({
    name: req.body.name,
    category: req.body.category,
    especialities: req.body.especialities,
    content: req.body.content,
    price: req.body.price,
    discount: req.body.discount,
    ingredients: req.body.ingredients,
    usage_and_benefits: req.body.usage_and_benefits,
    how_to_use: req.body.how_to_use,
    disclaimer: req.body.disclaimer,
    image: imageFiles,
  });

  //save data into database
  let category = "cat";
  product_data
    .save(product_data)
    .then((product_data) => {
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
      .then((product_datas) => {
        res.send(product_datas);
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

    let product_data;

    if (req.files != "") {
      let imageFiles = [];
      req.files.forEach((element) => {
        imageFiles.push(element.path);
      });

      product_data = {
        name: req.body.name,
        category: req.body.category,
        especialities: req.body.especialities,
        content: req.body.content,
        price: req.body.price,
        discount: req.body.discount,
        ingredients: req.body.ingredients,
        usage_and_benefits: req.body.usage_and_benefits,
        how_to_use: req.body.how_to_use,
        disclaimer: req.body.disclaimer,
        image: imageFiles,
      };
    } else {
      product_data = {
        name: req.body.name,
        category: req.body.category,
        especialities: req.body.especialities,
        content: req.body.content,
        price: req.body.price,
        discount: req.body.discount,
        ingredients: req.body.ingredients,
        usage_and_benefits: req.body.usage_and_benefits,
        how_to_use: req.body.how_to_use,
        disclaimer: req.body.disclaimer,
      };
    }

    Userdb.findByIdAndUpdate(id, product_data, {
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

// //Delete raw herb
// exports.delete = (req, res) => {
//   const id = req.params.id;
//   const imagePath = req.link.attr;

//   console.log(id + " 157");
//   console.log(imagePath + " 158");

//   // delete a file
//   try {
//     fs.unlinkSync(imagePath);

//     console.log("File is deleted.");
//   } catch (error) {
//     console.log(error);
//   }

//   // Userdb.findByIdAndDelete(id)
//   //   .then((data) => {
//   //     if (!data) {
//   //       res.status(404).send({ message: `Cannot delete with id ${id}` });
//   //     } else {
//   //       res.send({
//   //         message: "Data deleted Successfully",
//   //       });
//   //     }
//   //   })
//   //   .catch((err) => {
//   //     res.status(500).send({ message: "Error to Delete data" });
//   //   });
// };
