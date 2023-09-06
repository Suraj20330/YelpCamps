const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const users = require("../controllers/users");
const { storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(users.renderRegister) //displays the registration form on the server side
  .post(catchAsync(users.register)); //submits the registration form on the server side

router
  .route("/login")
  .get(users.renderLogin) //displays the login form on the server side
  .post(
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
