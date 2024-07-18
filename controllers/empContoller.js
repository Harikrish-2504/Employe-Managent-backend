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
  try {
    const employee = await empService.createEmployee(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
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
  console.log("GET WORKED");

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
  // console.log(findEmp);
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
  try {
    const employeeId = req.params.id;
    const deletedemployee = await empService.deleteEmployee(employeeId);
    const imagepath = path.join(__dirname, "..", "public", "uploads", `${employeeId}.png`);
    if (fs.existsSync(imagepath)) {
      fs.unlinkSync(imagepath);
    }
    res.status(200).json(deletedemployee);
  } catch (error) {
    res.status(204).json({error: error.message});
  }
});

//* Soft delete

const softDeleteEmployee = async (req, res) => {
  try {
    const result = await employee.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      {new: true}
    );
    res.status(200).json(result);
    // console.log('Employee soft deleted:', result);
  } catch (error) {
    console.error("Error soft deleting employee:", error);
  }
};
//* Restore
const restoreEmployee = async (req, res) => {
  try {
    const result = await employee.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: false,
        deletedAt: null,
      },
      {new: true}
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error restoring employee:", error);
  }
};

//* Search And Pageniation

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
      {$match: {isDeleted: false}},
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
//* Search And Pageniation

const TrashsearchAndPagination = asyncHandler(async (req, res) => {
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
      {$match: {isDeleted: true}},
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

module.exports = {
  getEmpData,
  addEmpData,
  getEmp,
  updateEmp,
  delEmp,
  postimg,
  softDeleteEmployee,
  restoreEmployee,
  searchAndPagination,
  TrashsearchAndPagination,
};
