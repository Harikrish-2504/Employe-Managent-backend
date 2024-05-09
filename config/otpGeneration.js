const dotenv = require("dotenv").config();
const {text} = require("body-parser");
const nodemaier = require("nodemailer");

//email
const transporter = nodemaier.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

//send OTP
const sendOtp = async (email, otp) => {
  const otpmail = nodemaier.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Your One Time Password for Verification",
    text: `OTP IS ${otp}`,
  };
  try {
    await otpmail.sendMail(mailData);
    console.log("OTO SEND SUCCESSFULLY");
    console.log(mailData);
  } catch (error) {
    console.error(error);
    throw new Error("Error in sending OTP");
  }
};

module.exports = {transporter,sendOtp}