const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const cookieParser = require("cookie-parser");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));

//MongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/public"));

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json());
//for payment ends

//load Admin assets
app.use("/uploads", express.static("uploads"));
app.use(
  "/admin_css",
  express.static(path.resolve(__dirname, "assets/admin/css"))
);
app.use(
  "/admin_img",
  express.static(path.resolve(__dirname, "assets/admin/img"))
);
app.use(
  "/admin_js",
  express.static(path.resolve(__dirname, "assets/admin/js"))
);

// load public assets
app.use(
  "/public_css",
  express.static(path.resolve(__dirname, "assets/public/css"))
);
app.use(
  "/public_img",
  express.static(path.resolve(__dirname, "assets/public/img"))
);
app.use(
  "/public_js",
  express.static(path.resolve(__dirname, "assets/public/js"))
);

app.use(
  "/public_fullpage",
  express.static(path.resolve(__dirname, "assets/public/fullpagejs"))
);
app.use(
  "/public_images",
  express.static(path.resolve(__dirname, "assets/public/images"))
);
app.use(
  "/public_owlcarousel",
  express.static(path.resolve(__dirname, "assets/public/owl"))
);
app.use(
  "/public_pageable",
  express.static(path.resolve(__dirname, "assets/public/Pageable--master"))
);
app.use(
  "/public_webfont",
  express.static(path.resolve(__dirname, "assets/public/webfont"))
);

//load Routers
app.use("/", require("./server/routes/router"));

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
