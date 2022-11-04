const bcrypt = require("bcrypt");
const { Admin } = require("../models");

exports.createAdmin = async () => {
  const username = process.env.DEFAULT_ADMIN_USERNAME;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  try {
    const admin = await Admin.findOne({ username: username });

    if (admin !== null) {
      return true;
    }

    const newAdmin = new Admin({
      username: username,
      password: hashed,
    });

    await newAdmin.save();
    console.log("----------------------");
    console.log("Admin created with");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log("----------------------");
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
