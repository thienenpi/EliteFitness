const Exercise = require('../models/Exercises')
const fs = require('fs')
const { parse } = require('csv-parse')
const path = require('path')
const multer = require('multer')

const countImagesInFolder = (folderPath, imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']) => {
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
      return 0
    }

    const files = fs.readdirSync(folderPath)

    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    return imageFiles.length
  } catch (error) {
    console.error('Counting error:', error)
    return -1
  }
}

function convertToCamelCase(inputString) {
  const camelCaseString = inputString.replace(/\s(.)/g, function (match, group) {
    return group.toUpperCase()
  })

  return camelCaseString.charAt(0).toLowerCase() + camelCaseString.slice(1)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = convertToCamelCase(file.originalname)
    const folderPath = path.join(__dirname, `../pictures/${folderName}/`)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const folderName = convertToCamelCase(file.originalname)
    const folderPath = path.join(__dirname, `../pictures/${folderName}/`)
    const imageCnt = countImagesInFolder(folderPath)
    const imageName = `picture_${imageCnt}.jpg`
    cb(null, imageName)
  }
})

module.exports = {
  upload: multer({ storage: storage }),
  createExercise: async (req, res) => {
    const newExercise = new Exercise(req.body)

    try {
      await newExercise.save()
      res.status(200).json(newExercise)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  uploadIncorrectPicture: async (req, res) => {
    try {
      //   const imageCnt = countImagesInFolder('handPlank')
      //   const imageName = `image_${imageCnt}.png`
      const imagePath = req.file.path
      res.status(200).json(imagePath)
    } catch (error) {
      console.error(error)
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
        TimeCnt: [],
        Angles: [],
        Velocities: []
      }

      fs.createReadStream(csvPath)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
          data.TimeCnt.push(row[0])
          data.Angles.push(JSON.parse(row[1]))
          data.Velocities.push(JSON.parse(row[2]))
        })
        .on('end', function () {
          res.status(200).json(data)
          console.log('finished')
        })
        .on('error', function (error) {
          res.status(500).json(error.message)
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
            index: 'elitefitness',
            text: {
              query: req.params.key,
              path: {
                wildcard: '*'
              }
            }
          }
        }
      ])
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
