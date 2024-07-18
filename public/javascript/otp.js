// const employee = require("../models/employeeModel");
// const bcrypt = require("bcryptjs");
// const fs = require('fs');
// const path = require('path');

// const getAllEmployees = async () => {
//   try {
//     return await employee.find();
//   } catch (error) {
//     throw new Error("Failed to fetch employees");
//   }
// };

// const createEmployee = async (data) => {
//   const {
//     firstname,
//     lastname,
//     salutation,
//     phone,
//     email,
//     dob,
//     username,
//     password,
//     gender,
//     qualification,
//     state,
//     country,
//     city,
//     pin,
//     address,
//   } = data;

//   // Check for missing fields
//   if (
//     !firstname || !lastname || !salutation || !phone || !email ||
//     !username || !password || !dob || !gender || !qualification ||
//     !state || !country || !city || !pin || !address
//   ) {
//     throw new Error("All fields are required");
//   }

//   // Hash password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     return await employee.create({
//       firstname,
//       lastname,
//       salutation,
//       phone,
//       email,
//       username,
//       password: hashedPassword,
//       dob,
//       gender,
//       qualification,
//       state,
//       country,
//       city,
//       pin,
//       address,
//     });
//   } catch (error) {
//     throw new Error("Failed to create employee");
//   }
// };

// const uploadImage = async (id, file) => {
//   if (!file) {
//     throw new Error("No file uploaded");
//   }

//   const imgPath = `public/uploads/${file.filename}`;
//   try {
//     await employee.findByIdAndUpdate(id, { image: imgPath });
//     return "Image uploaded";
//   } catch (error) {
//     throw new Error("Failed to upload image");
//   }
// };

// const getEmployeeById = async (id) => {
//   try {
//     const employeeData = await employee.findById(id);
//     if (!employeeData) {
//       throw new Error("Employee not found");
//     }
//     return employeeData;
//   } catch (error) {
//     throw new Error("Failed to fetch employee");
//   }
// };

// const updateEmployee = async (id, data) => {
//   try {
//     const employeeData = await employee.findById(id);
//     if (!employeeData) {
//       throw new Error("Employee not found");
//     }
//     return await employee.findByIdAndUpdate(id, data, { new: true });
//   } catch (error) {
//     throw new Error("Failed to update employee");
//   }
// };

// const deleteEmployee = async (id) => {
//   try {
//     const employeeData = await employee.findById(id);
//     if (!employeeData) {
//       throw new Error("Employee not found");
//     }
//     await employeeData.deleteOne();
//     return employeeData;
//   } catch (error) {
//     throw new Error("Failed to delete employee");
//   }
// };


