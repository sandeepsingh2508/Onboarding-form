const express = require("express");
const router = express.Router()
router.use(express.json())

const checkAuth = require("../Middlewares/CheckAuth");
const checkAdmin = require("../Middlewares/CheckAdmin");
const {
  fetchCurrentUser,
  handleAdmin,
  createNewUser,
  loginWithPhoneOtp,
  verifyPhoneOtp
} = require("../Controllers/AuthController");


router.post("/register", createNewUser);

router.route("/login_with_phone").post(loginWithPhoneOtp);


router.post("/verify", verifyPhoneOtp);

router.get("/me", checkAuth, fetchCurrentUser);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

module.exports = router;
