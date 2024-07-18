const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {getEmpData, addEmpData, getEmp, updateEmp, delEmp,postimg,softDeleteEmployee, searchAndPagination,restoreEmployee,TrashsearchAndPagination} = require("../controllers/empContoller");

router.route("/").get(getEmpData).post(addEmpData);
router.post("/:id/image",upload.single("image"),postimg);

// router.route("/").post(addEmpData);
router.route("/searchAndPagination").get(searchAndPagination);
router.route("/TrashsearchAndPagination").get(TrashsearchAndPagination);

router.route("/:id").get(getEmp).put(updateEmp).delete(delEmp);
router.route("/delete/:id").put(softDeleteEmployee)
router.route("/restore/:id").put(restoreEmployee)


// router.route("/:id");

// router.route("/:id");

module.exports = router;
