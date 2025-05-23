const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    description: String,
    image: { 
      url:String,
      filename:String,
    },
    image1:{
        url:String,
        filename:String,
    },
    image2:{
        url:String,
        filename:String,
    },
    image3:{
        url:String,
        filename:String,
    },
    image4:{
        url:String,
        filename:String,
    },
    price: Number, 
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

//when delete a listing, delete all reviews associated with it

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
