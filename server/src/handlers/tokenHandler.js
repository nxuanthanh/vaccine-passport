const { verify } = require("jsonwebtoken");
const { Admin, User } = require("../models");

const tokenDecode = (req) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];

    try {
      const tokenDecode = verify(bearer, process.env.TOKEN_SECRET_KEY);
      return tokenDecode;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

exports.verifyAdminToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (tokenDecoded) {
    const admin = await Admin.findById(tokenDecoded.id);

    if (!admin) return res.status(403).json("Not Allowed");

    req.admin = admin;
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (tokenDecoded) {
    const admin = await Admin.findById(tokenDecoded.id);
    const user = await User.findById(tokenDecoded.id);

    if (!admin && !user) return res.status(403).json("Not Allowed");
    req.admin = admin;
    req.user = user;

    next();
  } else {
    console.log("như nào");
    res.status(401).json("Unauthorized");
  }
};
