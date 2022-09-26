const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

const BlogModel = new mongoose.model("blog", BlogSchema);

module.exports = { BlogModel };
