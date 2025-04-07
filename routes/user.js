const express=require("express");
const router= express.Router({mergeParams:true});
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
.route("/signup")
.get(userController.renderSignupForm)// render signup form
.post( wrapAsync(userController.singup ))// signup route

router
.route("/login")
.get(userController.renderLoginForm)// render login form
.post( saveRedirectUrl, passport.authenticate("local",{failureRedirect: '/login', failureFlash:true}), userController.login)// login route

//logout
router.get("/logout",userController.logout);

module.exports=router;