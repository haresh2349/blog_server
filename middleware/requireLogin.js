const { UserModel } = require("../model/UserSchema");

require("dotenv").config();
const requireLogin = async (req, res, next) => {
  try {
    const { authrization } = req.headers;
    if (!authrization) {
      return res.status(404).send({ type: "error", message: "please login" });
    }
    const token = authrization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRETKEY, function (err, decoded) {
        if (err) {
          return res.status(404).send({
            type: "error",
            message: "please login with right credentials",
          });
        }
        const id = decoded.id;
        const user = UserModel.findOne({ _id: id });
        req.user_data = user;
        next();
      });
    } else {
      res.status(404).send({ type: "error", message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requireLogin };
