const { Vaccine, VaccineLot, UserVaccine } = require("../models");

exports.create = async (req, res) => {
  try {
    const newVaccineLot = new VaccineLot({
      name: req.body.name,
      quantity: req.body.quantity,
      vaccinated: 0,
      vaccine: req.body.vaccineId,
    });

    const savedVaccineLot = await newVaccineLot.save();

    res.status(201).json(savedVaccineLot);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const vaccineLotList = await VaccineLot.find({})
      .populate("vaccine")
      .sort("-createdAt");

    res.status(200).json(vaccineLotList);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const vaccineLot = await VaccineLot.findById(req.params.id).populate(
      "vaccine"
    );

    res.status(200).json(vaccineLot);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const vaccineLotUpdated = await VaccineLot.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }
    );

    res.status(200).json(vaccineLotUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await UserVaccine.deleteMany({ vaccineLot: req.params.id });
    await VaccineLot.deleteMany({ vaccineLot: req.params.id });

    res.status(200).json("Delete Vaccine lot successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
