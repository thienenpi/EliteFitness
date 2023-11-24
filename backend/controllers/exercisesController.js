const Exercise = require("../models/Exercises")
const fs = require("fs")
const { parse } = require("csv-parse")
const path = require("path")

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
      const csvPath = path.join(__dirname, exercise.csvPath)
      var data = {
        FrameNo: [],
        Angles: [],
        Velocities: [],
      }

      fs.createReadStream(csvPath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
          data.FrameNo.push(row[1])
          data.Angles.push(JSON.parse(row[2]))
          data.Velocities.push(JSON.parse(row[3]))
        })
        .on("end", function () {
          res.status(200).json(data)
          console.log("finished")
        })
        .on("error", function (error) {
          console.log(error.message)
        })
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
