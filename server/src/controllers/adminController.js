const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

exports.login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.body.username,
    });

    if (!admin) return res.status(401).json("Wrong username");

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!isValidPassword) return res.status(401).json("Wrong password");

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.TOKEN_SECRET_KEY
    );

    admin.password = undefined;

    res.status(200).json({
      token,
      admin,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
