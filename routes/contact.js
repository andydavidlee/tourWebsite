const express = require("express");

const router = express.Router();
const { validationResult, matchedData } = require("express-validator");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("layout", (req, res) => {
  res.render("/", {
    data: {},
    errors: {}
  });
});

router.post(
  "/",  async (req, res) => {

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", {
        data: req.body,
        errors: errors.mapped()
      });
    }

    const data = matchedData(req);
    console.log("Sanitized: ", data);
    // Homework: send sanitized data in an email or persist in a db

    req.flash("success", "Thanks for the message! I‘ll be in touch :)");
    res.redirect("/");
  }
);

module.exports = router;
