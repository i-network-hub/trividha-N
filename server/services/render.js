const axios = require("axios");
let Orders = require("../model/orders");

//Public
let Articles = require("../model/articles");

var ProductsCatData = require("../model/product_cat");
var ProductsData = require("../model/products");

//Admin
let Privacy = require("../model/privacy");
let Return = require("../model/return");

const jwtoken = require("jsonwebtoken");
const signup = require("../model/signup");

// ------------------admin starts------------

// -------------dashboard------------

// admin homepage
exports.defaultAdmin = (req, res) => {
  res.render("admin/index");
};
exports.defaultAdminIndex = (req, res) => {
  res.render("admin/index");
};
// -------------dashboard ends------------

// ----------Pages starts----------------

// admin privacy
exports.adminUpload_privacy = async (req, res) => {
  // res.render("admin/upload_privacy");
  //Make a get request to /api/privacy
  // axios
  //   .get("https://trividhaa.herokuapp.com/api/privacy")
  //   .then(function (response) {
  //     res.render("admin/upload_privacy", { privacy: response.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  let data = await Privacy.find();
  res.render("admin/upload_privacy", { privacy: data });
};

// admin returns
exports.adminreturns = async (req, res) => {
  // res.render("admin/return_policy");
  // //Make a get request to /api/return
  // axios
  //   .get("https://trividhaa.herokuapp.com/api/return")
  //   .then(function (response) {
  //     res.render("admin/return_policy", { return_Policy: response.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
  let data = await Return.find();
  res.render("admin/return_policy", { return_Policy: data });
};

// admin terms
exports.adminUpload_terms = (req, res) => {
  // res.render("admin/upload_terms");
  //Make a get request to /api/terms
  axios
    .get("https://trividhaa.herokuapp.com/api/terms")
    .then(function (response) {
      res.render("admin/upload_terms", { terms: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// ----------Pages ends----------------

// ----------Plans starts----------------

// deit plans
exports.adminDiet_plans = (req, res) => {
  // res.render("admin/diet_plans");
  //Make a get request to /api/diets
  axios
    .get("https://trividhaa.herokuapp.com/api/diets")
    .then(function (response) {
      res.render("admin/diet_plans", { diets: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// weight management plans
exports.adminWeight_plans = (req, res) => {
  // res.render("admin/weight_plans");
  //Make a get request to /api/weight_plans
  axios
    .get("https://trividhaa.herokuapp.com/api/weight_plans")
    .then(function (response) {
      res.render("admin/weight_plan", { weight_plans: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// ----------Plans ends----------------

// ----------Deseases starts----------------

// Deseases category
exports.adminDisease_category = (req, res) => {
  // res.render("admin/disease_category");
  //Make a get request to /api/disease_category
  axios
    .get("https://trividhaa.herokuapp.com/api/disease_category")
    .then(function (response) {
      res.render("admin/disease_category", { disease_category: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// Deseases
exports.adminDisease = (req, res) => {
  // res.render("admin/disease");
  //Make a get request to /api/disease
  // axios
  //   .get("https://trividhaa.herokuapp.com/api/disease")
  //   .then(function (response) {
  //     res.render("admin/disease", { disease: response.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  let disease = "https://trividhaa.herokuapp.com/api/disease";
  let disease_category = "https://trividhaa.herokuapp.com/api/disease_category";

  const requestOne = axios.get(disease);
  const requestTwo = axios.get(disease_category);

  axios
    .all([requestOne, requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];

        res.render("admin/disease", {
          disease: responseOne.data,
          disease_cate: responseTwo.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// Remedies
exports.adminRemedies = (req, res) => {
  // res.render("admin/remedies");
  //Make a get request to /api/remedies
  axios
    .get("https://trividhaa.herokuapp.com/api/remedies")
    .then(function (response) {
      res.render("admin/remedies", { remedies: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// ----------Deseases ends----------------

// --------shop starts-------------

// Products
exports.adminProduct = (req, res) => {
  // res.render("admin/product");
  //Make a get request to /api/products
  // axios
  //   .get("https://trividhaa.herokuapp.com/api/products")
  //   .then(function (response) {
  //     res.render("admin/product", { products: response.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  let products = "https://trividhaa.herokuapp.com/api/products";
  let products_category = "https://trividhaa.herokuapp.com/api/product_category";

  const requestOne = axios.get(products);
  const requestTwo = axios.get(products_category);

  axios
    .all([requestOne, requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];

        res.render("admin/product", {
          products: responseOne.data,
          product_cate: responseTwo.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// add_product_category
exports.adminProduct_cat = (req, res) => {
  // res.render("admin/product_category");
  //Make a get request to /api/product_category
  axios
    .get("https://trividhaa.herokuapp.com/api/product_category")
    .then(function (response) {
      res.render("admin/product_category", { product_category: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// admin raw herbs
exports.adminRawHerb = (req, res) => {
  // res.render("admin/raw_herb");
  //Make a get request to /api/raw_herbs
  axios
    .get("https://trividhaa.herokuapp.com/api/raw_herbs")
    .then(function (response) {
      res.render("admin/raw_herb", { raw_herbs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.adminRawHerbUpload = (req, res) => {
  res.render("admin/_raw_herbs_upload");
};
exports.adminRawHerbEdit = (req, res) => {
  //Make a get request to /api/raw_herbs
  axios
    .get("https://trividhaa.herokuapp.com/api/raw_herbs", {
      params: { id: req.query.id },
    })
    .then(function (response) {
      res.render("admin/_raw_herbs_edit", { raw_herbs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// --------shop ends-------------

// ----------Clients  starts----------------

// testimonials
exports.adminTestimonials = (req, res) => {
  // res.render("admin/testimonials");
  //Make a get request to /api/testimonials
  axios
    .get("https://trividhaa.herokuapp.com/api/testimonials")
    .then(function (response) {
      res.render("admin/testimonials", { testimonials: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// faq's
exports.adminUpload_faq = (req, res) => {
  // res.render("admin/upload_faq");
  //Make a get request to /api/faq
  axios
    .get("https://trividhaa.herokuapp.com/api/faq")
    .then(function (response) {
      res.render("admin/upload_faq", { faq: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// careers
exports.adminJob_opening = (req, res) => {
  // res.render("admin/job_opening");
  //Make a get request to /api/job_openings
  axios
    .get("https://trividhaa.herokuapp.com/api/job_openings")
    .then(function (response) {
      res.render("admin/job_opening", { jobs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// ----------Clients  ends----------------

// ----------Read  starts----------------

// blogs
exports.adminBlogs = (req, res) => {
  // res.render("admin/blogs");
  //Make a get request to /api/blogs
  axios
    .get("https://trividhaa.herokuapp.com/api/blogs")
    .then(function (response) {
      res.render("admin/blogs", { blogs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// aticles
exports.adminArticles = (req, res) => {
  // res.render("admin/articles");
  //Make a get request to /api/articles
  axios
    .get("https://trividhaa.herokuapp.com/api/articles")
    .then(function (response) {
      res.render("admin/articles", { articles: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// past camps
exports.adminPast_camps = (req, res) => {
  // res.render("admin/past_camps");
  //Make a get request to /api/past_camps
  axios
    .get("https://trividhaa.herokuapp.com/api/past_camps")
    .then(function (response) {
      res.render("admin/past_camps", { past_camps: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// upcomming camps
exports.adminUpcoming_camps = (req, res) => {
  // res.render("admin/upcoming_camps");
  //Make a get request to /api/upcoming_camps
  axios
    .get("https://trividhaa.herokuapp.com/api/upcoming_camps")
    .then(function (response) {
      res.render("admin/upcoming_camps", { upcoming_camps: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// ----------Read  ends----------------

// -------------Views Starts---------------
// admin appointments
exports.adminAppointments = (req, res) => {
  axios
    .get("https://trividhaa.herokuapp.com/api/appointment")
    .then(function (response) {
      res.render("admin/appointment", { appointments: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// admin orders
exports.adminOrders = async (req, res) => {
  let orderData = await Orders.find();
  res.render("admin/orders", {
    orders: orderData,
  });

  // axios
  //   .get("https://trividhaa.herokuapp.com/api/payment/order")
  //   .then(function (response) {
  //     res.render("admin/orders", { orders: response.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });
};

// admin orders
exports.adminOrdersDetails = async (req, res) => {
  if (req.query.id) {
    // axios
    //   .get("https://trividhaa.herokuapp.com/api/payment/order?id=${req.query.id}")
    //   .then(function (response) {
    //     res.render("admin/orders-details", { orders_details: response.data });
    //   })
    //   .catch((err) => {
    //     res.send(err);
    //   });
    let orderData = await Orders.findById(req.query.id);
    res.render("admin/orders-details", {
      orders_details: orderData,
    });
  }
};

// admin contact
exports.adminContact = (req, res) => {
  // res.render("admin/contact");
  //Make a get request to /api/contact
  axios
    .get("https://trividhaa.herokuapp.com/api/contact")
    .then(function (response) {
      res.render("admin/contact", { contact: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// admin career
exports.adminCareer = (req, res) => {
  // res.render("admin/career");
  //Make a get request to /api/career
  axios
    .get("https://trividhaa.herokuapp.com/api/career_pub")
    .then(function (response) {
      res.render("admin/career", { career: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// admin quote
exports.adminQuote_requests = (req, res) => {
  // res.render("admin/quote_requests");
  //Make a get request to /api/quotes
  axios
    .get("https://trividhaa.herokuapp.com/api/quotes")
    .then(function (response) {
      res.render("admin/quote_requests", { quotes: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// -------------Views ends---------------

// admin quote
exports.admin_add_promo = (req, res) => {
  axios
    .get("https://trividhaa.herokuapp.com/api/promo_codes")
    .then(function (response) {
      res.render("admin/add_promo", { promo: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// newsletter
exports.admin_newsletter = (req, res) => {
  axios
    .get("https://trividhaa.herokuapp.com/api/newsletter")
    .then(function (response) {
      res.render("admin/newsletter", { newsletter: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// comments
exports.admin_comments = (req, res) => {
  axios
    .get("https://trividhaa.herokuapp.com/api/post_comments")
    .then(function (response) {
      res.render("admin/comments", { comments: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// ------------Admin Ends----------------

// ----------Public starts-------------

// homepage
exports.publicIndex = (req, res) => {
  // let blogData = "https://trividhaa.herokuapp.com/api/blogs";
  let productData = "https://trividhaa.herokuapp.com/api/products";
  let testimonials = "https://trividhaa.herokuapp.com/api/testimonials";

  // const requestOne = axios.get(blogData);
  const requestTwo = axios.get(productData);
  const requestTrd = axios.get(testimonials);

  axios
    .all([requestTwo, requestTrd])
    .then(
      axios.spread((...responses) => {
        // const responseOne = responses[0];
        const responseTwo = responses[0];
        const responseThree = responses[1];

        while (responseThree.data.length < 6) {
          responseTwo.data.push({
            name: "Ken",
            image: "Vice City",
          });
          responseThree.data.push({
            name: "Ken Rosenberg",
            heading: "Vice City",
            testimonial: "wuhgegwegwe",
          });
        }

        if (req.cart_data_val) {
          console.log("in if" + req.cart_data_val);
          res.render("public/index", {
            products: responseTwo.data,
            cartValue: req.cart_data_val,
            testimonials: responseThree.data,
          });
        } else {
          console.log("in else" + req.cart_data_val);
          res.render("public/index", {
            products: responseTwo.data,
            cartValue: false,
            testimonials: responseThree.data,
          });
        }
      })
    )
    .catch((err) => {
      res.send(err);
    });
};

// About
exports.publicAbout = async (req, res) => {
  res.render("public/about_us");
};

// Article
exports.publicArticle = (req, res) => {
  // res.render("public/article");
  // if (req.query.id) {
  axios
    .get(`https://trividhaa.herokuapp.com/api/articles`)
    .then(function (response) {
      res.render("public/article", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
  // }
};

// Ayurveda
exports.publicAyurveda = (req, res) => {
  // res.render("public/ayurveda");
  if (req.query.id) {
    let productData = "https://trividhaa.herokuapp.com/api/products";
    let product_cat_Data = "https://trividhaa.herokuapp.com/api/product_category";

    const requestOne = axios.get(productData);
    const requestTwo = axios.get(product_cat_Data);

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          let data = [];
          responseOne.data.forEach((element) => {
            if (element.category.toUpperCase() === req.query.id.toUpperCase()) {
              data.push({
                _id: element._id,
                name: element.name,
                content: element.content,
                image: element.image,
                category: element.category,
                price: element.price,
                discount: element.discount,
              });
            }
          });

          let category_data = [];
          responseTwo.data.forEach((element) => {
            if (element.category.toUpperCase() == req.query.id.toUpperCase()) {
              category_data.push({
                category: element.category,
                details: element.details,
              });
            }
          });

          if (req.cart_data_val) {
            res.render("public/ayurveda", {
              data: data,
              category_data: category_data,
              cartValue: req.cart_data_val,
            });
          } else {
            res.render("public/ayurveda", {
              data: data,
              category_data: category_data,
              cartValue: false,
            });
          }
        })
      )
      .catch((errors) => {
        res.send(err);
      });
  }
};

// blog_digest
exports.public_blog_digest = async (req, res) => {
  if (req.query.id) {
    const token = req.cookies.jwttoken;

    let userIs = false;
    let userName;
    let userEmail;

    if (token) {
      const verifyUser = jwtoken.verify(token, process.env.KEY_SEC_TOKEN);
      const user = await signup.findOne({ _id: verifyUser._id });
      if (user) {
        userIs = true;
        userName = user.fname + " " + user.lname;
        userEmail = user.email;
      }
    }
    let blog_data = `https://trividhaa.herokuapp.com/api/blogs?id=${req.query.id}`;
    let comment_data = `https://trividhaa.herokuapp.com/api/post_comments?blog_id=${req.query.id}`;
    let requestOne = axios.get(blog_data);
    let requestTwo = axios.get(comment_data);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          if (req.cart_data_val) {
            res.render("public/blog_digest", {
              data: responseOne.data,
              comments: responseTwo.data,
              userIs,
              userName,
              userEmail,
              cartValue: req.cart_data_val,
            });
          } else {
            res.render("public/blog_digest", {
              data: responseOne.data,
              comments: responseTwo.data,
              userIs,
              userName,
              userEmail,
              cartValue: false,
            });
          }
        })
      )
      .catch((errors) => {
        res.send(errors);
      });
  }
};

// blog_joint_pain
exports.public_article_read = async (req, res) => {
  // res.render("public/blog_digest");
  // if (req.query.id) {
  //   axios
  //     .get(`https://trividhaa.herokuapp.com/api/articles?id=${req.query.id}`)
  //     .then(function (response) {
  //       if (req.cart_data_val)
  //         res.render("public/blog_digest", {
  //           data: response.dat,
  //           cartValue: req.cart_data_val,
  //         });
  //       else
  //         res.render("public/blog_digest", {
  //           data: response.data,
  //           cartValue: false,
  //         });
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //     });
  // }

  if (req.query.id) {
    const token = req.cookies.jwttoken;

    let userIs = false;
    let userName;
    let userEmail;

    if (token) {
      const verifyUser = jwtoken.verify(token, process.env.KEY_SEC_TOKEN);
      const user = await signup.findOne({ _id: verifyUser._id });
      if (user) {
        userIs = true;
        userName = user.fname + " " + user.lname;
        userEmail = user.email;
      }
    }
    let articles_data = `https://trividhaa.herokuapp.com/api/articles?id=${req.query.id}`;
    let comment_data = `https://trividhaa.herokuapp.com/api/post_comments?blog_id=${req.query.id}`;
    let requestOne = axios.get(articles_data);
    let requestTwo = axios.get(comment_data);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];

          if (req.cart_data_val) {
            res.render("public/blog_digest", {
              data: responseOne.data,
              comments: responseTwo.data,
              userIs,
              userName,
              userEmail,
              cartValue: req.cart_data_val,
            });
          } else {
            res.render("public/blog_digest", {
              data: responseOne.data,
              comments: responseTwo.data,
              userIs,
              userName,
              userEmail,
              cartValue: false,
            });
          }
        })
      )
      .catch((errors) => {
        res.send(errors);
      });
  }
};

// blog
exports.public_blog = (req, res) => {
  // res.render("public/blog");
  ////Make a get request to /api/raw_herbs
  axios
    .get("https://trividhaa.herokuapp.com/api/blogs")
    .then(function (response) {
      console.log(response.data);
      res.render("public/blog", { blogs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// body_analysis_vpk
exports.public_body_analysis_vpk = (req, res) => {
  res.render("public/body_analysis_vpk");
};

// camps
exports.public_camps = (req, res) => {
  // res.render("public/camps");

  if (req.query.id) {
    axios
      .get(`https://trividhaa.herokuapp.com/api/upcoming_camps?id=${req.query.id}`)
      .then(function (response) {
        console.log(response.data);
        res.render("public/camps", { data: response.data });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  // let campData = `https://trividhaa.herokuapp.com/api/upcoming_camps?id=${req.query.id}`;
  // const requestTwo = axios.get(campData);
  // axios
  //   .all([requestTwo])
  //   .then(
  //     axios.spread((...responses) => {
  //       const responseTwo = responses[0];
  //       console.log(responseTwo.data.image.length);

  //       while (responseTwo.data.image.length < 3) {
  //         console.log(responseTwo.data.image);
  //         responseTwo.data.image.push("image.jpg");
  //       }
  //       console.log(responseTwo.data);
  //       res.render("public/camps", { data: responseTwo.data });
  //     })
  //   )
  //   .catch((errors) => {
  //     res.send(errors);
  //   });
};

// career
exports.public_career = (req, res) => {
  // res.render("public/career");
  //Make a get request to /api/job_openings
  axios
    .get("https://trividhaa.herokuapp.com/api/job_openings")
    .then(function (response) {
      res.render("public/career", { jobs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// cart
exports.public_cart = (req, res) => {
  // res.render("public/cart");
  let cartData = `https://trividhaa.herokuapp.com/api/cart?user_id=${req.user._id}`;
  const requestTwo = axios.get(cartData);
  axios
    .all([requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseTwo = responses[0];
        // let cartData = {
        //   cartData: null,
        //   cartValue: null,
        // };
        // responseTwo.data.forEach((element) => {
        //   if (element.userId == req.user._id) {
        //     cartData = {
        //       cartData: element,
        //       cartValue: element.products.length,
        //     };
        //   }
        // });
        let cartData = {
          cartData: null,
          cartValue: null,
          sub_total: null,
          status: null,
          discount_made: null,
          price_after_promo: null,
        };

        responseTwo.data.forEach((element) => {
          if (element.userId == req.user._id) {
            let total_amount = null;
            element.products.forEach((child_element) => {
              total_amount = total_amount + child_element.total_price;
            });
            cartData = {
              cartData: element,
              cartValue: element.products.length,
              sub_total: total_amount,

              status: null,
              discount_made: "Not Applicable",
              price_after_promo: null,
            };
          }
        });
        res.render("public/cart", cartData);
      })
    )
    .catch((errors) => {
      res.send(errors);
    });
};

// Apply Promo Code
exports.apply_promo_code = (req, res) => {
  console.log(req.query.promo);
  let getPromoCode = `https://trividhaa.herokuapp.com/api/promo_codes?id=${req.query.promo}`;
  let getCartData = `https://trividhaa.herokuapp.com/api/cart?user_id=${req.user._id}`;
  const requestOne = axios.get(getPromoCode);
  const requestTwo = axios.get(getCartData);
  axios
    .all([requestOne, requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];

        let preCartData = {
          cartData: null,
          cartValue: null,
          sub_total: null,
        };

        let promo_code_response = {
          status: null,
          discount_made: null,
          price_after_promo: null,
        };

        responseTwo.data.forEach((element) => {
          if (element.userId == req.user._id) {
            let total_amount = null;
            element.products.forEach((child_element) => {
              total_amount = total_amount + child_element.total_price;
            });
            preCartData = {
              cartData: element,
              cartValue: element.products.length,
              sub_total: total_amount,
            };
          }
        });

        if (responseOne.data[0]) {
          if (responseOne.data[0].discountType == "price") {
            let sell_price =
              preCartData.sub_total - responseOne.data[0].discount;

            promo_code_response = {
              status: true,
              discount_made: responseOne.data[0].discount,
              price_after_promo: sell_price,
            };
          }
          if (responseOne.data[0].discountType == "percent") {
            let sell_price =
              preCartData.sub_total -
              (responseOne.data[0].discount / 100) * preCartData.sub_total;
            let discount = preCartData.sub_total - sell_price;
            promo_code_response = {
              status: true,
              discount_made: discount,
              price_after_promo: sell_price,
            };
          }
        } else {
          promo_code_response = {
            status: null,
            discount_made: null,
            price_after_promo: null,
          };
        }

        let cartData = {
          ...preCartData,
          ...promo_code_response,
        };

        res.render("public/cart", cartData);
      })
    )
    .catch((errors) => {
      res.send(errors);
    });
};

//logout
exports.public_logout = async (req, res) => {
  try {
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter((element) => {
      return element.token != req.token;
    });

    res.clearCookie("jwttoken");
    await req.user.save();
    res.render("public/log_in");
    console.log("Sign oUt");
  } catch (err) {
    res.status(500).send(err);
  }
};

// //profile
// exports.public_profile = async (req, res) => {
//   Orders.find({ userId: req.user._id })
//     .then((data) => {
//       let orders = [];
//       console.log(data);
//       res.render("public/profile", {
//         user: req.user,
//         orders: data,
//       });
//     })
//     .catch((err) => {
//       console.log("44 => " + err);
//       res.status(500).send({
//         message: err.message || "Some error occured while retriving",
//       });
//     });
// };
//profile
exports.public_profile = async (req, res) => {
  let orderData = await Orders.find({ userId: req.user._id });
  res.render("public/profile", {
    user: req.user,
    orders: orderData,
  });
};

// check_all_program
exports.public_check_all_program = (req, res) => {
  // res.render("public/check_all_program");
  let weightData = "https://trividhaa.herokuapp.com/api/weight_plans";

  const requestOne = axios.get(weightData);

  axios
    .all([requestOne])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        res.render("public/check_all_program", {
          weightPlans: responseOne.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// contact
exports.public_contact = (req, res) => {
  res.render("public/contact");
};

// diet
exports.public_diet = (req, res) => {
  //// res.render("public/diet");

  let dietData = "https://trividhaa.herokuapp.com/api/diets";
  let faqData = "https://trividhaa.herokuapp.com/api/faq";

  const requestOne = axios.get(dietData);
  const requestTwo = axios.get(faqData);
  // const requestTrd = axios.get(testimonials);

  axios
    .all([requestOne, requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        // const responseThree = responses[2];

        while (responseOne.data.length < 7) {
          responseOne.data.push({
            name: "Ken Rosenberg",
            content: "Vice City",
            image: "eg",
          });
        }
        res.render("public/diet", {
          diets: responseOne.data,
          faqs: responseTwo.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// disease
exports.public_disease = (req, res) => {
  //// res.render("public/disease");
  if (req.query.id) {
    ////Make a get request to /api/raw_herbs
    axios
      .get(`https://trividhaa.herokuapp.com/api/disease?id=${req.query.id}`)
      .then(function (response) {
        console.log(response.data);
        res.render("public/disease", { data: response.data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

// doctor
exports.public_doctor = (req, res) => {
  //// res.render("public/doctor");
  // let dietData = "https://trividhaa.herokuapp.com/api/diets";
  let faqData = "https://trividhaa.herokuapp.com/api/faq";

  // const requestOne = axios.get(dietData);
  const requestTwo = axios.get(faqData);
  // const requestTrd = axios.get(testimonials);

  axios
    .all([requestTwo])
    .then(
      axios.spread((...responses) => {
        // const responseOne = responses[0];
        const responseTwo = responses[0];
        // const responseThree = responses[2];
        res.render("public/doctor", {
          faqs: responseTwo.data,
        });
      })
    )
    .catch((err) => {
      res.send(err);
    });
};

// exploe_all_plans
exports.public_explore_all_plans = (req, res) => {
  // res.render("public/explore_all_plan");

  let dietData = "https://trividhaa.herokuapp.com/api/diets";

  const requestOne = axios.get(dietData);

  axios
    .all([requestOne])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];

        res.render("public/explore_all_plan", {
          diets: responseOne.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// public_single_plan
exports.public_single_plan = (req, res) => {
  // res.render("public/plan_single");

  let dietData = `https://trividhaa.herokuapp.com/api/diets?id=${req.query.id}`;
  const requestOne = axios.get(dietData);
  axios
    .all([requestOne])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        console.log(responseOne.data);

        res.render("public/plan_single", {
          data: responseOne.data,
        });
      })
    )
    .catch((errors) => {
      res.send(errors);
    });
};

// public_single_weight
exports.public_single_weight = (req, res) => {
  axios
    .get(`https://trividhaa.herokuapp.com/api/weight_plans?id=${req.query.id}`)
    .then(function (response) {
      res.render("public/weight_single", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// kapha_body_type
exports.public_kapha_body_type = (req, res) => {
  res.render("public/kapha_body_type");
};

// know_your_disease
exports.public_know_your_disease = (req, res) => {
  // res.render("public/know_your_disease");
  let disease_categoryData = "https://trividhaa.herokuapp.com/api/disease_category";
  const requestOne = axios.get(disease_categoryData);

  axios
    .all([requestOne])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        res.render("public/know_your_disease", {
          disease_category: responseOne.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// kutki
exports.public_kutki = (req, res) => {
  //// res.render("public/kutki");
  if (req.query.id) {
    ////Make a get request to /api/raw_herbs
    axios
      .get(`https://trividhaa.herokuapp.com/api/raw_herbs?id=${req.query.id}`)
      .then(function (response) {
        console.log(response.data);
        while (response.data.image.length < 4) {
          response.data.image.push("image.jpg");
        }
        res.render("public/kutki", { data: response.data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

// log_in
exports.public_log_in = (req, res) => {
  res.render("public/log_in");
};

// nadi_parikshan
exports.public_nadi_parikshan = (req, res) => {
  res.render("public/nadi_parikshan");
};

// nutraceuticals
exports.public_nutraceuticals = (req, res) => {
  // res.render("public/nutraceuticals");
  axios
    .get(`https://trividhaa.herokuapp.com/api/products`)
    .then(function (response) {
      res.render("public/nutraceuticals", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// nutritionals_consultants
exports.public_nutritionals_consultants = (req, res) => {
  // res.render("public/nutritionals_consultants");

  let weightData = "https://trividhaa.herokuapp.com/api/weight_plans";
  let dietData = "https://trividhaa.herokuapp.com/api/diets";

  const requestOne = axios.get(weightData);
  const requestTwo = axios.get(dietData);

  axios
    .all([requestOne, requestTwo])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        while (responseOne.data.length < 7) {
          responseOne.data.push({
            name: "hii",
            image: "image.jpg",
            content: "dummy content",
          });
        }
        while (responseTwo.data.length < 10) {
          responseTwo.data.push({
            name: "hii",
            image: "image.jpg",
            content: "dummy content",
          });
        }
        res.render("public/nutritionals_consultants", {
          weightPlans: responseOne.data,
          diets: responseTwo.data,
        });
      })
    )
    .catch((errors) => {
      res.send(err);
    });
};

// pitta_body_yupe
exports.public_pitta_body_yupe = (req, res) => {
  res.render("public/pitta_body_yupe");
};

// pitta_kapha_body_types
exports.public_pitta_kapha_body_types = (req, res) => {
  res.render("public/pitta_kapha_body_types");
};

// privacy_policy
exports.public_privacy_policy = (req, res) => {
  // res.render("public/privacy_policy");
  axios
    .get("https://trividhaa.herokuapp.com/api/privacy")
    .then(function (response) {
      res.render("public/privacy_policy", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// product_single//&user_id=5de7ffa74fff640a0491bc4f
exports.public_product_single = async (req, res) => {
  // res.render("public/product_single");

  console.log("single product");

  let productData = `https://trividhaa.herokuapp.com/api/products?id=${req.query.id}`;
  let cartData = `https://trividhaa.herokuapp.com/api/cart?user_id=${req.user._id}`;
  let promoCode = `https://trividhaa.herokuapp.com/api/promo_codes`;

  const requestOne = axios.get(productData);
  const requestTwo = axios.get(cartData);
  const requestThree = axios.get(promoCode);

  axios
    .all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];

        let cartValue = 0;
        responseTwo.data.forEach((element) => {
          if (element.userId == req.user._id) {
            cartValue = element.products.length;
          }
        });
        res.render("public/product_single", {
          data: responseOne.data,
          cartValue: cartValue,
          promo: responseThree.data,
        });
      })
    )
    .catch((errors) => {
      res.send(errors);
    });
};

// // products
// exports.public_products = (req, res) => {
//   // res.render("public/products");

//   let productData = "https://trividhaa.herokuapp.com/api/products";
//   let product_cat_Data = "https://trividhaa.herokuapp.com/api/product_category";

//   const requestOne = axios.get(productData);
//   const requestTwo = axios.get(product_cat_Data);

//   axios
//     .all([requestOne, requestTwo])
//     .then(
//       axios.spread((...responses) => {
//         const responseOne = responses[0];
//         const responseTwo = responses[1];
//         // console.log(responseOne.data);

//         if (req.cart_data_val) {
//           res.render("public/products", {
//             all_data: responseOne.data,
//             data_category: responseTwo.data,
//             // data: group,
//             cartValue: req.cart_data_val,
//           });
//         } else {
//           res.render("public/products", {
//             all_data: responseOne.data,
//             data_category: responseTwo.data,
//             // data: group,
//             cartValue: false,
//           });
//         }
//       })
//     )
//     .catch((errors) => {
//       res.send(errors);
//     });
// };

// products
exports.public_products = async (req, res) => {
  // res.render("public/products");
  let products = [];
  let product_cat_data = await ProductsCatData.find();
  let product_data = await ProductsData.find();
  product_cat_data.forEach((elementCat) => {
    let locData = [];
    product_data.forEach((elementPro) => {
      if (elementPro.category == elementCat.category) {
        locData.push(elementPro);
      }
    });
    products.push(locData.slice(-4));
  });

  if (req.cart_data_val) {
    res.render("public/products", {
      sliderData: product_data.slice(-8),
      products: products,
      data_category: product_cat_data,
      // data: group,
      cartValue: req.cart_data_val,
    });
  } else {
    res.render("public/products", {
      sliderData: product_data.slice(-8),
      products: products,
      data_category: product_cat_data,
      // data: group,
      cartValue: false,
    });
  }
};

// all_raw_herbs
exports.public_raw_herbs = (req, res) => {
  ////Make a get request to /api/raw_herbs
  axios
    .get("https://trividhaa.herokuapp.com/api/raw_herbs")
    .then(function (response) {
      res.render("public/raw_herbs", { raw_herbs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
// all_raw_herbs
exports.public_all_raw_herbs = (req, res) => {
  // res.render("public/raw_herbs");

  ////Make a get request to /api/raw_herbs
  axios
    .get("https://trividhaa.herokuapp.com/api/raw_herbs")
    .then(function (response) {
      res.render("public/all_raw_herbs", { raw_herbs: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// remedies_single
exports.public_remedies_single = (req, res) => {
  // res.render("public/remedies_single");
  if (req.query.id) {
    ////Make a get request to /api/raw_herbs
    axios
      .get(`https://trividhaa.herokuapp.com/api/remedies?id=${req.query.id}`)
      .then(function (response) {
        res.render("public/remedies_single", { data: response.data });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

// remidies
exports.public_remidies = (req, res) => {
  // res.render("public/remedies");
  axios
    .get(`https://trividhaa.herokuapp.com/api/remedies`)
    .then(function (response) {
      console.log(response.data);
      res.render("public/remedies", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// return_policy
exports.public_return_policy = (req, res) => {
  // res.render("public/return_policy");
  axios
    .get("https://trividhaa.herokuapp.com/api/return")
    .then(function (response) {
      res.render("public/return_policy", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// sign_up
exports.public_sign_up = (req, res) => {
  res.render("public/sign_up");
};

// social_cause
exports.public_social_cause = (req, res) => {
  // res.render("public/social_cause");
  // let pastCamps = "https://trividhaa.herokuapp.com/api/past_camps";
  let upCamps = "https://trividhaa.herokuapp.com/api/upcoming_camps";

  // const requestOne = axios.get(pastCamps);
  const requestTwo = axios.get(upCamps);

  axios
    .all([requestTwo])
    .then(
      axios.spread((...responses) => {
        // const responseOne = responses[0];
        // const responseTwo = responses[1];

        let todayIs = new Date().toISOString().slice(0, 10);
        let upcoming_camps = [];
        let past_camps = [];

        responses[0].data.forEach((element) => {
          if (element.date < todayIs) {
            past_camps.push(element);
          } else {
            upcoming_camps.push(element);
          }
        });
        // console.log(upcoming_camps);
        // console.log(past_camps);

        res.render("public/social_cause", {
          past_camps: past_camps.slice(-2),
          upcoming_camps: upcoming_camps.slice(-2),
        });
      })
    )
    .catch((errors) => {
      res.send(errors);
    });
};

// terms_and_conditions
exports.public_terms_and_conditions = (req, res) => {
  // res.render("public/terms_and_conditions");
  axios
    .get("https://trividhaa.herokuapp.com/api/terms")
    .then(function (response) {
      res.render("public/terms_and_conditions", { data: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// vata_body_type
exports.public_vata_body_type = (req, res) => {
  res.render("public/vata_body_type");
};

// vata_kapha_body_type
exports.public_vata_kapha_body_type = (req, res) => {
  res.render("public/vata_kapha_body_type");
};

// vata_pitta_body_type
exports.public_vata_pitta_body_type = (req, res) => {
  res.render("public/vata_pitta_body_type");
};

// vata_pitta_kapha_body_type
exports.public_vata_pitta_kapha_body_type = (req, res) => {
  res.render("public/vata_pitta_kapha_body_type");
};

//Routes for the payment
exports.place_order = (req, res) => {
  let pastCamps = `https://trividhaa.herokuapp.com/api/cart?id=${req.query.id}`;

  const requestOne = axios.get(pastCamps);
  axios
    .all([requestOne])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        let totalPrice = 0;
        responseOne.data.products.forEach((element) => {
          totalPrice = totalPrice + element.price * element.quantity;
        });

        res.render("public/checkout", {
          payData: responseOne.data,
          totalPrice: totalPrice,
          key: process.env.KEY_ID,
        });
      })
    )
    .catch((err) => {
      res.send(err);
    });
};

//Routes for the payment
exports.public_payment = (req, res) => {
  res.render("public/checkout", {
    key: process.env.KEY_ID,
  });
};

// ----------Public ends---------------
