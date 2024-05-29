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

module.exports = {getAllEmployees,deleteEmployee};
