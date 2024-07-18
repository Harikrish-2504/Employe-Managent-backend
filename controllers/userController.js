const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {transporter, sendOtp} = require("../config/otpGeneration");

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
    return res.status(404).json({error: "* All fields are required"});

    // res.status(400);
    // throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({email});
  if (userAvailable) {
    return res.status(404).json({error: "* User already exist with this email"});

    // res.render("login", {
    //   alreadyExists: "User Exist",
    // });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const {otp, experiationOtp} = otpGeneration();
    req.session.signupData = {username, email, password: hashedPassword, otpGeneration: otp, experiationOtp};
    sendOtp(email, otp);
    return res.status(200).json({message: "registration completed please enter otp"});

    // return res.redirect("/otp");
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
    return res.redirect("/login");
  } else {
    return res.render("/otp", {
      error: " incorrect otp",
    });
  }
});

//*login user
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({error: "* User not found with this email"});
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      req.session.isAuth = true;
      return res.status(200).json({message: "Login successful"});
    } else {
      return res.status(401).json({error: "* The password you have entered is incorrect"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "Error during login"});
  }
});

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error in destroying session:", err);
      return next(err);
    }
    res.redirect("/login");
  });
};

module.exports = {regesterUser, loginUser, otpVerify, logout};
