const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    salutation: {
      type: String,
      required: [true, "salutation is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
    },
    dob: {
      type: String,
      required: [true, "dob is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    qualification: {
      type: String,
      required: [true, "qualification is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
  
    pin: {
      type: String,
      required: [true, "pin is required"],
    },
    image:{
      type:String,
      require:false,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {timestamps: true}

);

module.exports = mongoose.model("Employee", employeeSchema);
