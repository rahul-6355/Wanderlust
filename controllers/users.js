const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

// signup

module.exports.singup = async(req,res)=>{
  try{
    let {username, email, password}=req.body;
    let newUser = new User({username, email, password});
   const registeredUser= await User.register(newUser,password);
   req.login(registeredUser,(err)=>{
        if(err) return next(err);
        req.flash("success","Welcome to the Wanderlust!");
        res.redirect("/listings");
    });
  

  } catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
}

// login

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to the Wanderlust!");
res.redirect(res.locals.redirectUrl || "/listings");
}

// logout

module.exports.logout = (req,res,next)=>{
    req.logout((err)=> {
        if (err) { return next(err); }
        req.flash("success","Logged you out!");
        res.redirect("/listings");
      });
}