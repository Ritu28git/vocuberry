const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());


const routes = require("./routes");

console.log("ROUTES TYPE:", typeof routes);

app.use("/api", routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000 🚀");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });