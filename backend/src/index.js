require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const ApiError = require("./utils/ApiError");

const employeeRouter = require("./api/routes/employee.routes.js");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/employees", employeeRouter);

app.get("/", (req, res) => {
  res.send("Employee Management API is running...");
});
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 404;
  }
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    statusCode = 409;
  }

  const response = {
    success: false,
    message: message,
    ...(err.errors &&
      Array.isArray(err.errors) &&
      err.errors.length > 0 && { errors: err.errors }),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  return res.status(statusCode).json(response);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
