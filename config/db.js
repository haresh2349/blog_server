const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected DB successfully");
  } catch (error) {
    console.log("connection failed");
  }
};

module.exports = { connectDB };
