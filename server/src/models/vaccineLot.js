const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const vaccineLotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    quality: { type: String, required: true },
    vaccinated: {
      type: Number,
      required: true,
      default: 0,
    },
    vaccine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vaccine",
      required: true,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("VaccineLot", vaccineLotSchema);
