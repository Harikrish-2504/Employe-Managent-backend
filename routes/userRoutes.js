const {regesterUser,loginUser , otpVerify, logout} = require("../controllers/userController")
const express = require("express");
// const validateToken = require("../middleware/validationTokenHandller");
const router = express.Router();

router.post("/otp",otpVerify)
router.post("/signup",regesterUser)

router.post("/login",loginUser)
router.get("/logout",logout);
// router.get("/current",validateToken,currentUser)
module.exports = router;