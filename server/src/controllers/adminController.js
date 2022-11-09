const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin, Place, User, UserVaccine, VaccineLot } = require("../models");

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

exports.summary = async (req, res) => {
  try {
    const totalUser = await User.find({}).count();
    const totalPlace = await Place.find({}).count();

    // count user who has been vaccinated
    const userVaccinated = await UserVaccine.aggregate([
      {
        $group: { _id: "$user" },
      },
    ]).count("user");

    // count total vaccine dose
    const totalVacineDose = await VaccineLot.aggregate([
      {
        $group: { _id: null, quantity: { $sum: "$quantity" } },
      },
    ]);

    // count total used vaccine dose
    const totalVacineDoseUsed = await VaccineLot.aggregate().group({
      _id: null,
      vaccinated: { $sum: "$vaccinted" },
    });

    // get lates vaccine lot
    const latestVaccineLot = await VaccineLot.find({})
      .sort("-createdAt")
      .limit(4)
      .populate("vaccine");

    // count user who has one vaccine dose
    const userWithOneDose = await UserVaccine.aggregate()
      .group({
        _id: "$user",
        quantity: { $sum: +1 },
      })
      .match({ quantity: 1 })
      .count("count");

    // count user who has >= two dose
    const userWithAboveTwoDose = await UserVaccine.aggregate()
      .group({
        _id: "$user",
        quantity: { $sum: +1 },
      })
      .match({ quantity: { $gte: 2 } })
      .count("count");

    res.status(200).json({
      totalUser,
      totalPlace,
      userVaccinated: userVaccinated[0] ? userVaccinated[0].user : 0,
      availableVaccineDose:
        (totalVacineDose[0] ? totalVacineDose[0].quantity : 0) -
        (totalVacineDoseUsed[0] ? totalVacineDoseUsed[0].vaccinated : 0),
      latestVaccineLot,
      userVaccinatedAnalyst: {
        totalUser,
        userWithAboveTwoDose: userWithAboveTwoDose[0]
          ? userWithAboveTwoDose[0].count
          : 0,
        userWithOneDose: userWithOneDose[0] ? userWithOneDose[0].count : 0,
        userWithZeroDose:
          totalUser - (userVaccinated[0] ? userVaccinated[0].user : 0),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
