const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    numOfSet: { type: Number, required: true },
    numOfRep: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    videoUrls: [{ type: String, required: true }],
    muscles: [{ type: String, required: true }],
    csvPath: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Exercise', ExerciseSchema)
