const mongoose = require("mongoose")

const MuscleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Muscle", MuscleSchema)