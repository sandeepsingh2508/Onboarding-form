const express = require("express");
const {
  getAllCertificate,
  getCertificateById,
  addCertificate,
  deleteCertificate,
} = require("../Controllers/CertificateC");

const router = express.Router();

router.use(express.json());

router.route("/getCertificate").get(getAllCertificate);
router.route("/getCertificateById/:id").get(getCertificateById);
router.route("/addCertificate").post(addCertificate);
router.route('/deleteCertificate/:id').delete(deleteCertificate)

module.exports = router;
