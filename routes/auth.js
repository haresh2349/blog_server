const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../model/UserSchema");
require("dotenv").config();
const UserRouter = Router();
const jwt = require("jsonwebtoken");
UserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, 6, function (err, hash) {
        if (err) {
          return res
            .status(500)
            .send({ type: "error", messege: "An error occured" });
        }
        const user = new UserModel({ name, email, password: hash });
        user.save();
        return res
          .status(200)
          .send({ type: "success", messege: "Signupn successfully" });
      });
    });
  } catch (error) {
    res.status(500).send({ type: "error", messege: "An error occured" });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .send({ type: "error", message: "login with correct credentials" });
      } else {
        console.log("bii");
        const token = jwt.sign(
          { email: user?.email, id: user?._id },
          process.env.SECRETKEY,
          { expiresIn: "1d" }
        );
        return res.send({
          type: "success",
          messege: "Signupn successfully",
          token: token,
        });
      }
    });
  } catch (error) {
    res.status(500).send({ type: "error", messege: "An error occured" });
  }
});

module.exports = { UserRouter };
