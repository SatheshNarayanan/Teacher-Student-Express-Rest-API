const express = require("express");
const teachers = require("../models/teacherData");

const studentRouter = express.Router();

const {
  validObject,
  dataFind,
  findIndex,
  Update
} = require("../models/sharedFunctions");

studentRouter
  //get Student Data of respective Teacher
  .get("/:id/students/:studentId", (req, res) => {
    let { id, studentId } = req.params;
    const requiredTeacher = dataFind(id, teachers);
    if (requiredTeacher) {
      const students = dataFind(studentId, requiredTeacher.students);
      students
        ? res.status(200).json({ data: students })
        : res.status(400).send("Student unavailable");
    } else {
      res.status(400).send("Teacher unavailable");
    }
  })
  //Insert Student Data against respective Teacher
  .post("/:id/students", (req, res) => {
    let student = !Array.isArray(req.body) ? [req.body] : req.body;
    let validStudent = student.filter(each => validObject(each, "student"));
    let { id } = req.params;
    const requiredTeacher = dataFind(id, teachers);
    if (requiredTeacher) {
      requiredTeacher["students"] =
        typeof requiredTeacher.students === "undefined"
          ? []
          : requiredTeacher.students;
      validStudent = validStudent.filter(
        each => !requiredTeacher.students.find(next => next.id === each.id)
      );
      if (validStudent.length > 0) {
        requiredTeacher.students.push(...validStudent);
        res.status(200).json({
          message: "New Student added Successfully",
          data: requiredTeacher
        });
      } else {
        res.status(400).send("Invalid Student Data or Student already exists");
      }
    } else {
      res.status(400).send("Invalid Teacher ID");
    }
  })
  //Update Student Data against respective Teacher
  .put("/:id/students/:studentId", (req, res) => {
    let student = !Array.isArray(req.body) ? [req.body] : req.body;
    let validStudent = student.filter(each => validObject(each, "student"));
    let { id, studentId } = req.params;
    studentId = parseInt(studentId);
    const requiredTeacher = dataFind(id, teachers);
    if (requiredTeacher) {
      requiredTeacher["students"] =
        typeof requiredTeacher.students === "undefined"
          ? []
          : requiredTeacher.students;
      validStudent = validStudent.filter(each =>
        requiredTeacher.students.find(next => next.id === each.id)
      );
      const requiredStudent = dataFind(studentId, requiredTeacher.students);
      if (!validStudent.toString() || !requiredStudent) {
        res.status(400).send("Invalid Student Data or Student already exists");
      } else if (validStudent.length > 1 && requiredStudent) {
        res.status(406).json({
          message:
            "Only one Data can be Updated at a time,if Student Id is given",
          data: requiredTeacher
        });
      } else if (validStudent[0].id !== studentId) {
        res.status(409).json({
          message:
            "Student Id in Parameter doesn't match with Student Id in JSON ",
          data: requiredTeacher
        });
      } else {
        validStudent.forEach(each => Update(each, requiredTeacher.students));
        res.status(200).json({
          message: "Student Data has been Updated Successfully",
          data: requiredTeacher
        });
      }
    } else {
      res.status(400).send("Invalid Teacher ID");
    }
  })
  //Delete Student Data against respective Teacher
  .delete("/:id/students/:studentId", (req, res) => {
    const { id, studentId } = req.params;
    const teacherId = parseInt(id);
    const studId = parseInt(studentId);
    let requiredTeacherIndex = findIndex(teachers, teacherId);
    if (typeof requiredTeacherIndex !== "undefined") {
      let requiredStudentIndex = findIndex(
        teachers[requiredTeacherIndex].students,
        studId
      );
      if (typeof requiredStudentIndex !== "undefined") {
        teachers[requiredTeacherIndex].students.splice(requiredStudentIndex, 1);
        res.status(200).json({
          message: "Student Data has been deleted",
          data: teachers[requiredTeacherIndex]
        });
      } else {
        res.status(400).send("Invalid Student");
      }
    } else {
      res.status(400).send("Invalid Teacher");
    }
  });

module.exports = studentRouter;
