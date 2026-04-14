const express = require("express");
const router = express.Router();

const {
  getPermissions,
  updatePermissions
} = require("../controllers/permissionController");

router.get("/", getPermissions);
router.post("/batch", updatePermissions);

module.exports = router;