const router = require('express').Router()
const exerciseController = require('../controllers/exercisesController')
const upload = exerciseController.upload

router.post('/', exerciseController.createExercise)
router.post('/upload/', upload.single('picture'), exerciseController.uploadIncorrectPicture)
router.get('/', exerciseController.getAllExercises)
router.get('/:id', exerciseController.getExercise)
router.get('/search/:key', exerciseController.searchExercise)

module.exports = router
