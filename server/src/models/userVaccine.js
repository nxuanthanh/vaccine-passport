const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const userVaccineSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vaccine: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Vaccine",
      required: true,
    },
    vaccineLot: {
      type: mongoose.Schema.Types.ObjectId,
      required: "VaccineLot",
      required: true,
    },
    address: { type: String },
  },
  schemaOptions
);

module.exports = mongoose.model("UserVaccine", userVaccineSchema);
