const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const testRoutes = require("./routes/testRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const app = express();

app.use(express.json());
app.use("/api/tests", testRoutes);
app.use("/api/attempts", attemptRoutes);=

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running");
    });
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
console.log("Your backend is running in http://localhost:2000");

