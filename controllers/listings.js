const Listing = require("../models/listing");

//index route

module.exports.index =  async (req,res)=>{
    const allListings= await Listing.find();
   res.render("./listings/index.ejs",{allListings});
};

// New route

module.exports.renderNewForm = (req,res)=>{
   
    res.render("./listings/new.ejs");
};

// show route

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
            }
    })
    .populate("owner");//populate use to get all content of reviews object 
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
         res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
};

//create route

module.exports.createListing=async (req,res ,next)=>{
    // let{title,description,image,price,country,location}
    // let listing=req.body.listing;
   
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;

    if(req.files){
        if(req.files["listing[image]"]){
            const file=req.files["listing[image]"][0];
            newListing.image={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image1]"]){
            const file=req.files["listing[image1]"][0];
            newListing.image1={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image2]"]){
            const file=req.files["listing[image2]"][0];
            newListing.image2={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image3]"]){
            const file=req.files["listing[image3]"][0];
            newListing.image3={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image4]"]){
            const file=req.files["listing[image4]"][0];
            newListing.image4={url:file.path, filename:file.filename};
        }
    }

   await newListing.save();
    req.flash("success","New Listing Created");
    // console.log(listing);
    res.redirect("/listings");
    }

    // edit route

    module.exports.renderEditForm=async (req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id);
        if(!listing){
            req.flash("error","Listing you requested for does not exist!");
             res.redirect("/listings");
        }

        let originalImageUrl=listing.image.url;
       originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250");
        res.render("./listings/edit.ejs",{listing,originalImageUrl});
    }

    // update route

module.exports.updateListing=async (req,res)=>{
    let {id}= req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(req.files){
        if(req.files["listing[image]"]){
            const file=req.files["listing[image]"][0];
            listing.image={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image1]"]){
            const file=req.files["listing[image1]"][0];
            listing.image1={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image2]"]){
            const file=req.files["listing[image2]"][0];
            listing.image2={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image3]"]){
            const file=req.files["listing[image3]"][0];
            listing.image3={url:file.path, filename:file.filename};
        }
        if(req.files["listing[image4]"]){
            const file=req.files["listing[image4]"][0];
            listing.image4={url:file.path, filename:file.filename};
        }
        await listing.save();
    }
    
   req.flash("success","Listing Updated");
   res.redirect("/listings");
}

    // destroy route

    module.exports.destroyListing = async (req,res)=>{
        let {id}=req.params;
        let deletedListing= await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        
    req.flash("success","Listing Deleted");
        res.redirect("/listings");
    }

    module.exports.booking=async (req,res)=>{
        req.flash("success","Booking Confirmed");
        res.redirect("/listings");
    }

    module.exports.listSearch=async (req,res)=>{
        const {search}=req.query;
        const allListings= await Listing.find({location:search});
        if(allListings.length===0){
            req.flash("error","No Listing Found");
            return res.redirect("/listings");
        }
        res.render("./listings/index.ejs",{allListings});
    }