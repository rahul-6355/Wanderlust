const express=require("express");
const router= express.Router({mergeParams:true}); // mergeparams is used to access the params with id of the parent route

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review= require("../models/review.js");
const Listing= require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Reviews Post route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
 
 //delete Reviews route
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

 module.exports=router;
 