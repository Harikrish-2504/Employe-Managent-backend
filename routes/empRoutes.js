const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {getEmpData, addEmpData, getEmp, updateEmp, delEmp,postimg} = require("../controllers/empContoller");

router.route("/").get(getEmpData).post(addEmpData);
router.post("/:id/image",upload.single("image"),postimg);

// router.route("/").post(addEmpData);

router.route("/:id").get(getEmp).put(updateEmp).delete(delEmp);

// router.route("/:id");

// router.route("/:id");

module.exports = router;
