const asyncHandler = require("express-async-handler");
const employee = require("../models/employeeModel");
const errorHandler = require("../middleware/errorHandller");
const multer = require("../config/multer")
//* GET ALL EMPLOYEE DATA
//*@ ROUTE get /employees
const getEmpData = asyncHandler(async (req, res) => {
  const employees = await employee.find();
  res.status(200).json(employees);
});

//* CREATE NEW EMPLOYEE DATA
//*@ ROUTE POST /employees
const addEmpData = asyncHandler(async (req, res) => {
  console.log("The result is", req.body);
  const {
    firstname,
    lastname,
    salutation,
    phone,
    email,
    dob,
    username,
    password,
    gender,
    qualification,
    state,
    country,
    city,
    pin,
    address,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !salutation ||
    !phone ||
    !email ||
    !username ||
    !password ||
    !dob ||
    !gender ||
    !qualification ||
    !state ||
    !country ||
    !city ||
    !pin ||
    !address
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const empObject = await employee.create({
    firstname,
    lastname,
    salutation,
    phone,
    email,
    username,
    password,
    dob,
    gender,
    qualification,
    state,
    country,
    city,
    pin,
    address,
  });
  res.status(200).json(empObject);
});

//*image//
const postimg = async (req, res) => {
  if (req.file) {
    const imgPath = `public/uploads/${req.file.filename}`;
    await employee.findByIdAndUpdate(req.params.id, {image: imgPath});
    res.status(200).json({message: "Image uploaded "});
  } else {
    console.log("No file uploded");
    res.status(400).json({message: "Failed to upload image"});
  }
};

//* GET EMPLOYEE DATA
//*@ ROUTE GET /employees/:id

const getEmp = asyncHandler(async (req, res) => {
  const findEmp = await employee.findById(req.params.id);
  console.log(findEmp);
  if (!findEmp) {
    res.status(404);
    throw new Error("Employee not found");
  }

  res.status(200).json(findEmp);
});

//* UPDATE EMPLOYEE DATA
//*@ ROUTE PUT /employees/:id
const updateEmp = asyncHandler(async (req, res) => {
  const findEmp = await employee.findById(req.params.id);
  console.log(findEmp);
  if (!findEmp) {
    res.status(404);
    throw new Error("Employee not found");
  }
  const updatedEmp = await employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedEmp);
});

//* DELETE EMPLOYEE DATA
//*@ ROUTE DELETE /employees/:id
const delEmp = asyncHandler(async (req, res) => {
  const findEmp = await employee.findById(req.params.id);

  if (!findEmp) {
    res.status(404);
    throw new Error("Employee not found");
  }
  await findEmp.deleteOne();
  res.status(200).json(findEmp);
});

module.exports = {getEmpData, addEmpData, getEmp, updateEmp, delEmp, postimg};
