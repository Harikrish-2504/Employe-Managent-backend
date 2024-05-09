const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const { isAuth } = require("../authentication");

router.get("/", isAuth,viewController.renderindex);

router.get("/viewdetails", viewController.renderviewdetails);
router.get("/login", viewController.renderlogin);
router.get("/signup", viewController.rendersignup);
router.get("/otp", viewController.renderOtp);




module.exports = router;
