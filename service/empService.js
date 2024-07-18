const employeeModel = require("../models/employeeModel");

// Get all employees
async function getAllEmployees(){
    try {
        const employees = await employeeModel.find().sort({createdAt:-1});
        return employees;
    } catch (error) {
        throw new Error ("Users cannot get")
    }
}
// CREATE EMPLOYEE
const createEmployee = async (data) => {
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
  } = data;

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
    throw new Error("All fields are........ required");
  }

  return await employeeModel.create({
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
};
//delete employee
async function deleteEmployee(employeeId) {
    try {
        const deleteEmployee = await employeeModel.findByIdAndDelete(employeeId);
        if (!deleteEmployee) {
            throw new Error("employee not found");
        }
        return deleteEmployee;
    } catch (error) {
        throw new Error("error in deleting Employee");
    }
}
// const deleteEmployee = async (employeeId) => {
//   try {
//     const result = await employeeModel.findByIdAndUpdate(employeeId, {
//       isDeleted: true,
//       deletedAt: new Date()
//     });

//     console.log('Employee soft deleted:', result);
//   } catch (error) {
//     console.error('Error soft deleting employee:', error);
//   }
// };


module.exports = {getAllEmployees,deleteEmployee,createEmployee};
