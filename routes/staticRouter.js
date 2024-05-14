const express = require("express");
const router = express.Router();
const Url = require("../models/url");
router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  console.log("hello")
  const allUrls=await Url.find({});
  console.log("urls are ", allUrls);
  return res.render("home.ejs", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});

router.get("/login", (req, res) => {
  return res.render("login.ejs");
});

module.exports = router;
