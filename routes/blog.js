const { Router } = require("express");
const { requireLogin } = require("../middleware/requireLogin");
const { BlogModel } = require("../model/blogSchema");
const { UserModel } = require("../model/UserSchema");

const BlogRouter = Router();

BlogRouter.get("/getAll", requireLogin, async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    return res.status(200).send({ type: "success", blogs: blogs });
  } catch (error) {
    res.send("an error occured");
  }
});

BlogRouter.post("/create", requireLogin, async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    blog.save();
    return res.status(201).send({ type: "success", message: "blog created" });
  } catch (error) {
    res.send("an error occured");
  }
});

BlogRouter.patch("/update/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, req.body);
    await updatedBlog.save();
    return res.status(201).send({ type: "success", message: "Blog updated" });
  } catch (error) {
    res.send("an error occured");
    console.log(error);
  }
});

BlogRouter.delete("/delete/:id", requireLogin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    deletedBlog.save();
    return res.status(201).send({ type: "success", message: "Blog deleted" });
  } catch (error) {
    res.send("an error occured");
    console.log(error);
  }
});

module.exports = { BlogRouter };
