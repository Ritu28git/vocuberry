const express = require("express");
const router = express.Router();

const categoryRoutes = require("./route");

router.use("/", categoryRoutes);

module.exports = router;