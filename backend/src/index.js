const express = require("express");
const router = express.Router();

const categoryRoutes = require("./routes");

router.use("/", categoryRoutes);

module.exports = router;