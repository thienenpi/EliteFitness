const router = require('express').Router()
const { verifyUser } = require('../controllers/authController')
const exerciseController = require('../controllers/exercisesController')
const upload = exerciseController.upload

router.post('/', exerciseController.createExercise)
router.post('/upload/', upload.single('picture'), exerciseController.uploadIncorrectPicture)
router.get('/', exerciseController.getAllExercises)
router.get('/:id', exerciseController.getExercise)
router.get('/search/:key', verifyUser, exerciseController.searchExercise)

module.exports = router
