const asyncHandler = require("express-async-handler");
const employee = require("../models/employeeModel");
const errorHandler = require("../middleware/errorHandller");
const multer = require("../config/multer");
const empService = require("../service/empService");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

//* GET ALL EMPLOYEE DATA
//*@ ROUTE get /employees


const getEmpData = asyncHandler(async (req, res) => {
  try {
    const employees = await empService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
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
// const delEmp = asyncHandler(async (req, res) => {
//   const findEmp = await employee.findById(req.params.id);

//   if (!findEmp) {
//     res.status(404);
//     throw new Error("Employee not found");
//   }
//   await findEmp.deleteOne();
//   res.status(200).json(findEmp);
// });
// DELETE EMPLOYEE
const delEmp = asyncHandler(async (req, res) => {
  try {
      const employeeId = req.params.id;
      const deletedemployee = await empService.deleteEmployee(employeeId);
      const imagepath = path.join(__dirname, '..', 'public', 'uploads', `${employeeId}.png`);
      if (fs.existsSync(imagepath)) {
          fs.unlinkSync(imagepath);
      }
      res.status(200).json(deletedemployee);
  } catch (error) {
      res.status(204).json({ error: error.message })
  }
})


//* Search And Pageniation
// const searchAndPagination = asyncHandler(async (req, res) => {

//   const searchQuery = req.query.search;
//   const page = parseInt(req.query.page) || 1;
//   const pagesize = parseInt(req.query.pagesize) || 5;
//   const skip = (page - 1) * pagesize;
//   const matchCondition = searchQuery ? {firstname: {$regex: new RegExp(searchQuery, "i")}} : {};
//   try {
//     const result = await employee.aggregate([
//       {$match: matchCondition},
//       {$sort: {createdAt: -1}},
//       {
//         $facet: {
//           metadata: [{$count: "total"}],
//           data: [{$skip: skip}, {$limit: pagesize}],
//         },
//       },
//     ]);
//     const totalUserCount = result[0].metadata[0] ? result[0].metadata[0].total : 0;
//     const totalPage = Math.ceil(totalUserCount / pagesize);
//     let users = result[0].data;
//     res.status(200).json({
//       users: users,
//       pagination: {
//         totalPage: totalPage,
//         currentPage: page,
//       },
//     });
//   } catch (error) {
//     console.error("Error in searching and paginating Data",error)
// res.status(500).json({message:"Error in searching and pagination data"})  }
// });
const searchAndPagination = asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pagesize) || 5;
  const skip = (page - 1) * pageSize;

  // Construct the match condition for first name and last name
  
  let matchCondition = {};
  if (searchQuery) {
    matchCondition = {
      $or: [{firstname: {$regex: new RegExp(searchQuery, "i")}}, {lastname: {$regex: new RegExp(searchQuery, "i")}}],
    };
  }

  try {
    const result = await employee.aggregate([
      {$match: matchCondition},
      {$sort: {createdAt: -1}},
      {
        $facet: {
          metadata: [{$count: "total"}],
          data: [{$skip: skip}, {$limit: pageSize}],
        },
      },
    ]);

    const totalUserCount = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    const totalPage = Math.ceil(totalUserCount / pageSize);
    let users = result[0].data;

    res.status(200).json({
      users: users,
      pagination: {
        totalPage: totalPage,
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Error in searching and paginating Data", error);
    res.status(500).json({message: "Error in searching and pagination data"});
  }
});

module.exports = {getEmpData, addEmpData, getEmp, updateEmp, delEmp, postimg, searchAndPagination};
