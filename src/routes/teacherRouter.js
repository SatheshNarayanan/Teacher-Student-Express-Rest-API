const express = require("express");
const teachers = require("../models/teacherData");
const studentRouter = require("./studentRouter");

const {
  validObject,
  dataFind,
  findIndex,
  Update
} = require("../models/sharedFunctions");

const teacherRouter = express.Router();

teacherRouter.use("/", studentRouter);

teacherRouter
  //Get all Teacher Data
  .get("/", (req, res) => {
    res.status(200).json({
      message: "Please find all the Teacher Data",
      data: teachers
    });
  })
  //Get Teacher Data by ID
  .get("/:id", (req, res) => {
    const { id } = req.params;
    const requiredTeacher = dataFind(id, teachers);
    if (requiredTeacher) {
      res.status(200).json({
        message: "Please find the Teacher Data",
        data: requiredTeacher
      });
    } else {
      res.status(400).send("Teacher unavailable");
    }
  })
  //Insert New Teacher Data
  .post("/", (req, res) => {
    let teacher = !Array.isArray(req.body) ? [req.body] : req.body;
    let validTeacher = teacher.filter(each => validObject(each, "teacher"));
    validTeacher = validTeacher.filter(
      each => !teachers.find(next => next.id === each.id)
    );
    if (validTeacher.length > 0) {
      teachers.push(...validTeacher);
      res.status(200).json({
        message: "New Teacher added Successfully",
        data: teachers
      });
    } else {
      res.status(400).send("Invalid Teacher Data or Teacher already exists");
    }
  })
  //Update multiple Teacher Data
  .put("/", (req, res) => {
    let teacher = !Array.isArray(req.body) ? [req.body] : req.body;
    let validTeacher = teacher.filter(each => validObject(each, "teacher"));
    validTeacher = validTeacher.filter(each =>
      teachers.find(next => next.id === each.id)
    );
    if (validTeacher.length > 0) {
      validTeacher.forEach(each => Update(each, teachers));
      res.status(200).json({
        message: "Teacher Data has been Updated Successfully",
        data: teachers
      });
    } else {
      res.status(400).send("Invalid Teacher Data ");
    }
  })
  //Update Teacher Data by ID
  .put("/:id", (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let teacher = !Array.isArray(req.body) ? [req.body] : req.body;
    let validTeacher = teacher.filter(each => validObject(each, "teacher"));
    validTeacher = validTeacher.filter(each =>
      teachers.find(next => next.id === each.id)
    );
    if (!validTeacher.toString()) {
      res.status(400).send("Invalid Teacher Data ");
    } else if (validTeacher.length > 1) {
      res.status(406).json({
        message:
          "Only one Data can be Updated at a time,if Teacher Id is given",
        data: validTeacher
      });
    } else if (validTeacher[0].id !== id) {
      res.status(409).json({
        message:
          "Teacher Id in Parameter doesn't match with Teacher Id in JSON ",
        data: teachers
      });
    } else {
      validTeacher.forEach(each => Update(each, teachers));
      res.status(200).json({
        message: "Teacher Data has been Updated Successfully",
        data: teachers
      });
    }
  })
  //Delete all the data
  .delete("/", (req, res) => {
    teachers.splice(0, teachers.length);
    res.status(200).json({
      message: "All Teacher Data has been deleted",
      data: teachers
    });
  })
  //Delete individual data of Teacher by Id
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const teacherId = parseInt(id);
    let requiredTeacherIndex = findIndex(teachers, teacherId);
    if (typeof requiredTeacherIndex !== "undefined") {
      teachers.splice(requiredTeacherIndex, 1);
      res.status(200).json({
        message: "Teacher Data has been deleted",
        data: teachers
      });
    } else {
      res.status(400).send("Invalid Teacher");
    }
  });

module.exports = teacherRouter;
