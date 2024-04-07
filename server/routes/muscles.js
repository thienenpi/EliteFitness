const router = require('express').Router()
const { verifyUser } = require('../controllers/authController')
const muscleController = require('../controllers/musclesController')

router.post('/', muscleController.createMuscle)
router.get('/', verifyUser, muscleController.getAllMuscles)
router.get('/:id', muscleController.getMuscle)
router.get('/search/:key', muscleController.searchMuscle)

module.exports = router
