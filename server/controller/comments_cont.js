var Userdb = require("../model/comments");

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //nEw Data
  const comments = new Userdb({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    comment_on: req.body.comment_on,
    blog_id: req.body.blog_id,
  });

  //save data into database
  comments
    .save(comments)
    .then((comments) => {
      res.send("Thanks For The Comment.!!");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errror occured while creating",
      });
    });
};

//retrive and return all data as ell ass single one
exports.find = (req, res) => {
  if (req.query.blog_id) {
    console.log("blog id" + req.query.blog_id);
    const id = req.query.blog_id;
    Userdb.find({ blog_id: id })
      .then((data) => {
        if (!data) {
          //   res.status(404).send({ message: "Data not found" });
          res.send({
            name: "AA",
            comment:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae totam dignissimos harum ill repr",
            reply:
              " Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae totam dignissimos harum ill repr",
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        console.log("54 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  } else if (req.query.id) {
    console.log("inside normal id" + req.query.id);
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
        console.log("71 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  } else {
    console.log("inside else");
    Userdb.find()
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => {
        console.log("83 => " + err);
        res.status(500).send({
          message: err.message || "Some error occured while retriving",
        });
      });
  }
};

//Edit disease category
exports.update = (req, res) => {
  if (!req.body && !req.params.id) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.id;

  let comments = {
    comment: req.body.comment,
    reply: req.body.reply,
  };

  console.log(comments);

  Userdb.findByIdAndUpdate(id, comments, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update data with ${id}`,
        });
      } else {
        console.log(data);
        // res.send(data);
        // res.end("Comment Edited Successful");
        res.redirect("/admin/comments");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to Update data" });
    });
};

//Delete disease category
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
