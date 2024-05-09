const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {transporter, sendOtp} = require("../config/otpGeneration");

// const jwt = require("jsonwebtoken");
//Regeister a user
// POST/user
//access Public

// const regesterUser = asyncHandler(async (req, res) => {
//   const {username, email, password} = req.body;
//   if (!username || !email || !password) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }
//   const userAvailable = await User.findOne({email});
//   if (userAvailable) {
//     res.status(400);
//     throw new Error("User already registered!");
//   }

//   //Hashing password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   console.log("Hashed Password:", hashedPassword);
//   //new user
//   const user = await User.create({
//     username,
//     email,
//     password: hashedPassword,
//   });
//   console.log(`User created ${user}`);
//   if (user) {
//     res.status(201).json({_id: user.id, email: user.email});
//   } else {
//     res.status(400);
//     throw new Error("User data not valid");
//   }

//   res.json({message: "Registration of employee"});
// });

//* otp Generation function
function otpGeneration() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const experiationOtp = Date.now() + 2 * 60 * 1000;
  return {otp, experiationOtp};
}

// *register
const regesterUser = asyncHandler(async (req, res) => {
  const {username, email, password} = req.body;
  console.log(password);
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({email});
  if (userAvailable) {
    res.render("signup", {
      alreadyExists: "User Exist",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("dffggg")
    const {otp, experiationOtp} = otpGeneration();
    req.session.signupData = {username, email, password: hashedPassword, otpGeneration: otp, experiationOtp};
    sendOtp(email, otp);
    return res.redirect("/otp");
  }
});
const otpVerify = asyncHandler(async (req, res) => {
  const {otp} = req.body;
  console.log(otp);
  if (!req.session.signupData) {
    return res.render("otp", {error: "Data not Found"});
  }

  const {username, email, password, otpGeneration, experiationOtp} = req.session.signupData;
  if (Date.now() > experiationOtp) {
    delete req.session.signupData;
    return res.render("otp", {otpMissmatch: "Otp expired"});
  }
  if (otp === otpGeneration) {
    const userdata = await User.create({
      username,
      email,
      password,
    });
    delete req.session.signupData;
    return res.redirect("/signin");
  } else {
    return res.render("otp", {
      error: " incorrect otp",
    });
  }
});
//Login a user
// POST/login
//access Public
// const loginUser = asyncHandler(async (req, res) => {
//   const {email , password}= req.body;
//   if(!email || !password){
//     res.status(400)
//     throw new Error("All fields are mandatory")
//   }
//   const user = await User.findOne({email});
//   //compare password with hashedpassword
//   if(user && (await bcrypt.compare(password,user.password))){
//     const accesstoken = jwt.sign({
//       user:{
//         username:user.username,
//         email:user.email,
//         id:user.id,
//       }
//     },process.env.ACCESS_TOKEN_SECERT,
//   {expiresIn:"1m"})
//     res.status(200).json({accesstoken});

//   }else{
//     res.status(401)
//     throw new Error ("Email or password is not valid");
//   }

// });

//*login user
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).render("login", {emailNotFound: "User not Found"});
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      req.session.isAuth = true;
      res.redirect("/");
    } else {
      return res.status(404).render("login", {wrongPassword: "wrong Password"});
    }
  } catch (error) {
    console.error(error);
    return res.send("Error during Login");
  }
});
//current info of  a user
// POST/current
//access private
// const currentUser = asyncHandler(async (req, res) => {
//   res.json(req.user);
// });

module.exports = {regesterUser, loginUser, otpVerify};
