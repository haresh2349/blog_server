const express = require("express");
const { connectDB } = require("./config/db");
const { UserRouter } = require("./routes/auth");
const { BlogRouter } = require("./routes/blog");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", (req, res) => {
  res.send("Welcome to Blogs");
});
app.use("/auth", UserRouter);
app.use("/blogs", BlogRouter);
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("listening at port at 8080");
  } catch (error) {
    console.log(error);
  }
});
