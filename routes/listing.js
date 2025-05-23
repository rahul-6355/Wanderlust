
const express=require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing= require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer=require("multer"); // for handling multipart/form-data
const { storage } = require("../cloudConfig.js"); // for cloudinary storage
const upload = multer({storage}); // for cloudinary storage});

router
.route("/")
.get( wrapAsync(listingController.index)) // index route
.post(isLoggedIn,upload.fields([
    { name: "listing[image]", maxCount: 1 },
    { name: "listing[image1]", maxCount: 1 },
    { name: "listing[image2]", maxCount: 1 },
    { name: "listing[image3]", maxCount: 1 },
    { name: "listing[image4]", maxCount: 1 }
]),validateListing, wrapAsync(listingController.createListing)); // create route


//New route

router.get("/new",isLoggedIn,listingController.renderNewForm);


router.get("/search",wrapAsync(listingController.listSearch)); // search route

router
.route("/:id")
.get(wrapAsync(listingController.showListing)) // show route
.put(isLoggedIn,isOwner,upload.fields([
    { name: "listing[image]", maxCount: 1 },
    { name: "listing[image1]", maxCount: 1 },
    { name: "listing[image2]", maxCount: 1 },
    { name: "listing[image3]", maxCount: 1 },
    { name: "listing[image4]", maxCount: 1 }
]),validateListing,wrapAsync(listingController.updateListing)) // update route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); // destroy route

// Edit route

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// booking route
router.post("/:id/bookings",isLoggedIn,wrapAsync(listingController.booking)); // create booking route

module.exports = router;
