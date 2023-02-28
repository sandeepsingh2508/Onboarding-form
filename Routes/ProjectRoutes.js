const express = require("express");
const {
  getAllProject,
  getProjectById,
  addProject,
  updateDetail,
  deleteProject,
} = require("../Controllers/ProjectC");
const CheckAuth = require("../Middlewares/CheckAuth");
const router = express.Router();

router.use(express.json());

router.route("/getAllProject").get(getAllProject);
router.route("/getProjectById/:id").get(getProjectById);
router.route("/addProject").post( addProject);
router.route("/updateDetail/:id").put(updateDetail);
router.route("/delteProject").delete(deleteProject);

module.exports=router