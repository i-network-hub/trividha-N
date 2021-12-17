const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

const privacy_cont = require("../controller/privacy_cont");
const return_cont = require("../controller/return_cont");
const terms_cont = require("../controller/terms_cont");
const diets_cont = require("../controller/diets_cont");
const weight_cont = require("../controller/weight_cont");
const disease_cat_cont = require("../controller/disease_cat_cont");
const disease_cont = require("../controller/disease_cont");
const remedies_cont = require("../controller/remedies_cont");
const product_cont = require("../controller/product_cont");
const product_cat_cont = require("../controller/product_cat_cont");
const testimonials_cont = require("../controller/testimonials_cont");
const faq_cont = require("../controller/faq_cont");
const job_cont = require("../controller/job_cont");
const blog_cont = require("../controller/blog_cont");
const articles_cont = require("../controller/articles_cont");
const past_camp_cont = require("../controller/past_camp_cont");
const upcoming_camp_cont = require("../controller/upcoming_camp_cont");
const contact_cont = require("../controller/contact_cont");
const career_cont = require("../controller/career_cont");
const quote_cont = require("../controller/quote_cont");
const promo_cont = require("../controller/promo_code");
const appointment_cont = require("../controller/appointment_cont");
const newsletter_cont = require("../controller/newsletter_cont");

const comments = require("../controller/comments_cont");

const career_pub_cont = require("../controller/career_pub_cont");

const cart_cont = require("../controller/cart_cont");

const order_cont = require("../controller/order_cont");

const payment = require("../controller/payment");

const signup_cont = require("../controller/signup_cont");

const auth = require("../controller/auth");
const get_cart_data = require("../controller/get_cart_data");

const phone_auth = require("../controller/phone_auth");

// route.all("*", (req, res, next) => {
//   // res.render("public/log_in");
//   // console.log(req.cookies.jwttoken);

//   next();
// });

//Admin index page
//@method GET
// route.get("/admin", (req, res) => {
//   //   res.send("It Working Fine");
//   res.render("admin/index");
// });
// route.get("/admin/index", (req, res) => {
//   res.render("admin/index");
// });
route.get("/admin", services.defaultAdmin);
route.get("/admin/index", services.defaultAdminIndex);

//Admin Privacy
// route.get("/admin/upload_privacy", (req, res) => {
//   res.render("admin/upload_privacy");
// });

// ------------Pages Starts----------
// Admin Privacy
route.get("/admin/upload_privacy", services.adminUpload_privacy);
// admin returns
route.get("/admin/return_policy", services.adminreturns);
// admin terms
route.get("/admin/upload_terms", services.adminUpload_terms);
// -------------Pages Ends-------------

// ----------Plans starts----------------
//  deit plans
route.get("/admin/diet_plans", services.adminDiet_plans);
// weight management plans
route.get("/admin/weight_plans", services.adminWeight_plans);
// ----------Plans ends------------------

// ----------Deseases starts----------------
// disease_category
route.get("/admin/disease_category", services.adminDisease_category);
// Deseases
route.get("/admin/disease", services.adminDisease);
// Remedies
route.get("/admin/remedies", services.adminRemedies);
// ----------Deseases ends------------------

//Admin Raw herbs
// route.get("/admin/raw_herb", (req, res) => {
//   res.render("admin/raw_herb");
// });
// route.get("/admin/upload_raw_herbs", (req, res) => {
//   res.render("admin/_raw_herbs_upload");
// });
// route.get("/admin/edit_raw_herbs", (req, res) => {
//   res.render("admin/_raw_herbs_edit");
// });

// --------shop starts-------------
// Products
route.get("/admin/product", services.adminProduct);

// add_product_category
route.get("/admin/add_product_category", services.adminProduct_cat);

// admin raw herbs
route.get("/admin/raw_herb", services.adminRawHerb);
route.get("/admin/upload_raw_herbs", services.adminRawHerbUpload);
route.get("/admin/edit_raw_herbs", services.adminRawHerbEdit);

// --------shop ends-------------

// ----------Clients  starts----------------
// testimonials
route.get("/admin/testimonials", services.adminTestimonials);
// faq's
route.get("/admin/upload_faq", services.adminUpload_faq);
// careers
route.get("/admin/job_opening", services.adminJob_opening);
// ----------Clients  ends----------------

// ----------Read  starts----------------
// blogs
route.get("/admin/blogs", services.adminBlogs);
// articles
route.get("/admin/articles", services.adminArticles);
// past camps
route.get("/admin/past_camps", services.adminPast_camps);
// upcomming camps
route.get("/admin/upcoming_camps", services.adminUpcoming_camps);
// ----------Read  ends------------------

//Admin Contact
// route.get("/admin/contact", (req, res) => {
//   res.render("admin/contact");
// });

// -------------Views Starts---------------
// admin appointment
route.get("/admin/appointment", services.adminAppointments);
// admin orders
route.get("/admin/orders", services.adminOrders);
// admin orders
route.get("/admin/orders-details", services.adminOrdersDetails);
// admin contact
route.get("/admin/contact", services.adminContact);
// admin career
route.get("/admin/career", services.adminCareer);
// admin quote
route.get("/admin/quote_requests", services.adminQuote_requests);
// -------------Views Ends---------------

//promo code
route.get("/admin/add_promo", services.admin_add_promo);

//newsletter
route.get("/admin/newsletter", services.admin_newsletter);

//comments
route.get("/admin/comments", services.admin_comments);

// -------------Public Pages---------------
// homepage
route.get("/", get_cart_data, services.publicIndex);
route.get("/index", get_cart_data, services.publicIndex);

// About
route.get("/about_us", services.publicAbout);

// Article
route.get("/article", services.publicArticle);

// Ayurveda
route.get("/list_products", get_cart_data, services.publicAyurveda);

// blog_read
route.get("/blog_read", get_cart_data, services.public_blog_digest);

// article_read
route.get("/article_read", get_cart_data, services.public_article_read);

// blog
route.get("/blog", services.public_blog);

// body_analysis_vpk
route.get("/body_analysis_vpk", services.public_body_analysis_vpk);

// camps
route.get("/camps", services.public_camps);

// career
route.get("/career", services.public_career);

// cart
route.get("/cart", auth, services.public_cart);

// cart
route.get("/logout", auth, services.public_logout);

// check_all_program
route.get("/check_all_program", services.public_check_all_program);

// contact
route.get("/contact", services.public_contact);

// diet
route.get("/diet", services.public_diet);

// disease
route.get("/disease", services.public_disease);

// doctor
route.get("/doctor", services.public_doctor);

// exploe_all_plans
route.get("/explore_all_plan", services.public_explore_all_plans);

// single_plan
route.get("/plan_single", services.public_single_plan);

// /plan_single_in_both
route.get("/weight_single", services.public_single_weight);

// kapha_body_type
route.get("/kapha_body_type", services.public_kapha_body_type);

// know_your_disease
route.get("/know_your_disease", services.public_know_your_disease);

// log_in
route.get("/log_in", services.public_log_in);

// nadi_parikshan
route.get("/nadi_parikshan", services.public_nadi_parikshan);

// nutraceuticals
route.get("/nutraceuticals", services.public_nutraceuticals);

// nutritionals_consultants
route.get(
  "/nutritionals_consultants",
  services.public_nutritionals_consultants
);

// pitta_body_yupe
route.get("/pitta_body_yupe", services.public_pitta_body_yupe);

// pitta_kapha_body_types
route.get("/pitta_kapha_body_types", services.public_pitta_kapha_body_types);

// privacy_policy
route.get("/privacy_policy", services.public_privacy_policy);

// product_single
route.get("/product_single", auth, services.public_product_single);

// products
route.get("/products", get_cart_data, services.public_products);

// raw_herbs
route.get("/raw_herbs", services.public_raw_herbs);
// raw_herbs
route.get("/all_raw_herbs", services.public_all_raw_herbs);
// kutki
route.get("/raw_herb_product", services.public_kutki);

// remedies_single
route.get("/remedies_single", services.public_remedies_single);

// remidies
route.get("/remedies", services.public_remidies);

// return_policy
route.get("/return_policy", services.public_return_policy);

// sign_up
route.get("/sign_up", services.public_sign_up);

// social_cause
route.get("/social_cause", services.public_social_cause);
// terms_and_conditions
route.get("/terms_and_conditions", services.public_terms_and_conditions);

// vata_body_type
route.get("/vata_body_type", services.public_vata_body_type);

// vata_kapha_body_type
route.get("/vata_kapha_body_type", services.public_vata_kapha_body_type);

// vata_pitta_body_type
route.get("/vata_pitta_body_type", services.public_vata_pitta_body_type);

// vata_pitta_kapha_body_type
route.get(
  "/vata_pitta_kapha_body_type",
  services.public_vata_pitta_kapha_body_type
);

//Routes for the payment
route.get("/place_order", services.place_order);
//Routes for the payment
route.get("/payments", services.public_payment);

//Routes for the profile
route.get("/profile", auth, services.public_profile);

// -------------Public Pages---------------

//Api calls

route.post("/api/appointment", appointment_cont.create);
route.get("/api/appointment", appointment_cont.find);
route.post("/api/appointment/status", appointment_cont.status_is);

route.post("/api/payment/order", payment.order);

route.post("/api/orders/status", order_cont.edit_status);

route.post("/api/payment/verify", auth, order_cont.placeorder, payment.verify);

// for raw herbs admin
route.post("/api/raw_herbs", controller.uploadImage, controller.create);
// route.post("/api/raw_herbs", controller.create);
route.get("/api/raw_herbs", controller.find);
route.post("/api/raw_herbs/:id", controller.update);
route.delete("/api/raw_herbs/:id", controller.delete);

// for privacy admin
route.post("/api/privacy", privacy_cont.create);
route.get("/api/privacy", privacy_cont.find);
route.post("/api/privacy/:id", privacy_cont.update);
route.delete("/api/privacy/:id", privacy_cont.delete);

// for return admin
route.post("/api/return", return_cont.create);
route.get("/api/return", return_cont.find);
route.post("/api/return/:id", return_cont.update);
route.delete("/api/return/:id", return_cont.delete);

// for terms admin
route.post("/api/terms", terms_cont.create);
route.get("/api/terms", terms_cont.find);
route.post("/api/terms/:id", terms_cont.update);
route.delete("/api/terms/:id", terms_cont.delete);

// for diets admin
route.post("/api/diets", diets_cont.uploadImage, diets_cont.create);
route.get("/api/diets", diets_cont.find);
route.post("/api/diets/:id", diets_cont.update);
route.delete("/api/diets/:id", diets_cont.delete);

// for weight_plans admin
route.post("/api/weight_plans", weight_cont.uploadImage, weight_cont.create);
route.get("/api/weight_plans", weight_cont.find);
route.post("/api/weight_plans/:id", weight_cont.update);
route.delete("/api/weight_plans/:id", weight_cont.delete);

// for disease category admin
route.post(
  "/api/disease_category",
  disease_cat_cont.uploadImage,
  disease_cat_cont.create
);
route.get("/api/disease_category", disease_cat_cont.find);
route.post("/api/disease_category/:id", disease_cat_cont.update);
route.delete("/api/disease_category/:id", disease_cat_cont.delete);

// for disease admin
route.post("/api/disease", disease_cont.uploadImage, disease_cont.create);
route.get("/api/disease", disease_cont.find);
route.post("/api/disease/:id", disease_cont.update);
route.delete("/api/disease/:id", disease_cont.delete);

// for remedies admin
route.post("/api/remedies", remedies_cont.uploadImage, remedies_cont.create);
route.get("/api/remedies", remedies_cont.find);
route.post("/api/remedies/:id", remedies_cont.update);
route.delete("/api/remedies/:id", remedies_cont.delete);

// for products admin
route.post("/api/products", product_cont.uploadImage, product_cont.create);
route.get("/api/products", product_cont.find);
route.post("/api/products/:id", product_cont.update);
route.delete("/api/products/:id", product_cont.delete);

// for product category admin
route.post(
  "/api/product_category",
  product_cat_cont.uploadImage,
  product_cat_cont.create
);
route.get("/api/product_category", product_cat_cont.find);
route.post("/api/product_category/:id", product_cat_cont.update);
route.delete("/api/product_category/:id", product_cat_cont.delete);

// for testimonials admin
route.post(
  "/api/testimonials",
  testimonials_cont.uploadImage,
  testimonials_cont.create
);
route.get("/api/testimonials", testimonials_cont.find);
route.post("/api/testimonials/:id", testimonials_cont.update);
route.delete("/api/testimonials/:id", testimonials_cont.delete);

// for faq admin
route.post("/api/faq", faq_cont.create);
route.get("/api/faq", faq_cont.find);
route.post("/api/faq/:id", faq_cont.update);
route.delete("/api/faq/:id", faq_cont.delete);

// for job_openings admin
route.post("/api/job_openings", job_cont.create);
route.get("/api/job_openings", job_cont.find);
route.put("/api/job_openings/:id", job_cont.update);
route.delete("/api/job_openings/:id", job_cont.delete);

// for blogs admin
route.post("/api/blogs", blog_cont.uploadImage, blog_cont.create);
// route.post("/api/blogs/:id", blog_cont.uploadImage, blog_cont.update);
route.post("/api/blogs/:id", blog_cont.update);
route.get("/api/blogs", blog_cont.find);
// route.put("/api/blogs/:id", blog_cont.update);
route.delete("/api/blogs/:id", blog_cont.delete);

// for articles admin
route.post("/api/articles", articles_cont.uploadImage, articles_cont.create);
route.get("/api/articles", articles_cont.find);
route.post("/api/articles/:id", articles_cont.update);
route.delete("/api/articles/:id", articles_cont.delete);

// for past_camps admin
route.post(
  "/api/past_camps",
  past_camp_cont.uploadImage,
  past_camp_cont.create
);
route.get("/api/past_camps", past_camp_cont.find);
route.post("/api/past_camps/:id", past_camp_cont.update);
route.delete("/api/past_camps/:id", past_camp_cont.delete);

// for upcoming_camps admin
route.post(
  "/api/upcoming_camps",
  upcoming_camp_cont.uploadImage,
  upcoming_camp_cont.create
);
// route.post("/api/upcoming_camps", upcoming_camp_cont.uploadImage);
route.get("/api/upcoming_camps", upcoming_camp_cont.find);
route.post("/api/upcoming_camps/:id", upcoming_camp_cont.update);
route.delete("/api/upcoming_camps/:id", upcoming_camp_cont.delete);

// for contact admin
route.post("/api/contact", contact_cont.create);
route.get("/api/contact", contact_cont.find);
route.put("/api/contact/:id", contact_cont.update);
route.delete("/api/contact/:id", contact_cont.delete);

// for career admin
route.post("/api/career", career_cont.create);
route.get("/api/career", career_cont.find);
route.put("/api/career/:id", career_cont.update);
route.delete("/api/career/:id", career_cont.delete);

// for quotes admin
route.post("/api/quotes", quote_cont.create);
route.get("/api/quotes", quote_cont.find);
route.put("/api/quotes/:id", quote_cont.update);
route.delete("/api/quotes/:id", quote_cont.delete);

// for promo admin
route.post("/api/promo_codes", promo_cont.create);
route.get("/api/promo_codes", promo_cont.find);
// route.get("/api/promo_codes/:id", promo_cont.find);
route.delete("/api/promo_codes/:id", promo_cont.delete);

// for newsletter
route.post("/api/newsletter", newsletter_cont.create);
route.get("/api/newsletter", newsletter_cont.find);
// route.get("/api/newsletter/:id", newsletter_cont.find);
route.delete("/api/newsletter/:id", newsletter_cont.delete);

// for career ppublic
route.post(
  "/api/career_pub",
  career_pub_cont.uploadImage,
  career_pub_cont.create
);
route.get("/api/career_pub", career_pub_cont.find);
route.get("/api/career_pub", career_pub_cont.delete);

// for handle cart
route.post("/api/cart", auth, cart_cont.workwithcart);
// route.get("/api/cart", auth, cart_cont.find);
route.get("/api/cart", cart_cont.find);
route.delete("/api/cart", auth, cart_cont.delete);

//For apply Promo code
route.get("/api/apply_promo", auth, services.apply_promo_code);

//login-signup
route.post("/api/sign_up", signup_cont.create);
route.post("/api/log_in", signup_cont.loginuser);

//login-signup-using-phone-auth
route.post("/api/log_in_otp", phone_auth.generate);
// route.post("/api/log_in_otp_verify", phone_auth.verify);
route.post(
  "/api/log_in_otp_verify",
  phone_auth.verify,
  signup_cont.user_using_otp
);

//For leaving post
route.post("/api/post_comments", comments.create);
route.get("/api/post_comments", comments.find);
route.post("/api/post_comments/:id", comments.update);
route.delete("/api/post_comments/:id", comments.delete);

//edit profile
route.post("/edit_profile", signup_cont.editUser);

module.exports = route;
