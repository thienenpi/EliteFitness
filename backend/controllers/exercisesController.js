const Exercise = require("../models/Exercises")

module.exports = {
  createExercise: async (req, res) => {
    const newExercise = new Exercise(req.body)

    try {
      await newExercise.save()
      res.status(200).json(newExercise)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getAllExercises: async (req, res) => {
    try {
      const exercises = await Exercise.find().sort({ createdAt: -1 })
      res.status(200).json(exercises)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getExercise: async (req, res) => {
    try {
      const exercise = await Exercise.findById(req.params.id)
      res.status(200).json(exercise)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  searchExercise: async (req, res) => {
    try {
      const result = await Exercise.aggregate([
        {
          $search: {
            index: "elitefitness",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ])
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  },
}
