const express = require("express");
const router = express.Router();

const {
    createStudent,
    getStudentById,
    getStudentList,
    getStudentAddressById,
    getStudentAddressList,
    deleteStudentAddressById,
    updateStudentAddress,
    deleteStudentById,
    updateStudent
} = require("../controllers/student.controller")

// Student related routes
router
    .get("/students/", getStudentList)
    .post("/students/", createStudent)
    .get("/students/:_id", getStudentById)
    .put("/students/:_id", updateStudent)
    .delete("/students/:_id", deleteStudentById);

// Address related routes
router
    .put("/students/:studentId/addresses/:addressId", updateStudentAddress)
    .get("/students/:studentId/addresses/", getStudentAddressList)
    .get("/students/:studentId/addresses/:addressId", getStudentAddressById)
    .delete("/students/:studentId/addresses/:addressId", deleteStudentAddressById)


module.exports = router;