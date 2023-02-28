const express = require("express");

const {
  getAllCourse,
  getCourseById,
  addCourse,
  deleteCourse
} = require("../Controllers/CourseC");

const router = express.Router();

router.use(express.json());

router.route("/getAllCourse").get(getAllCourse);
router.route("/getCourseById/:id").get(getCourseById);
router.route("/addCourse").post(addCourse);
router.route("/deleteCourse/:id").delete(deleteCourse);

module.exports = router;
