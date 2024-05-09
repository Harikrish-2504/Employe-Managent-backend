const path = require("path");
exports.renderindex = (req,res) => {
    res.render("index");
}
exports.renderviewdetails = (req,res) => {
    res.render("viewdetails");
}

exports.renderlogin = (req,res) => {
    res.render("login");
}
exports.rendersignup = (req,res) => {
    res.render("signup");
}
exports.renderOtp = (req,res) => {
    res.render("otp");
}