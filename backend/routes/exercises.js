const router = require("express").Router()
const exerciseController = require("../controllers/exercisesController")

router.post("/", exerciseController.createExercise)
router.get("/", exerciseController.getAllExercises)
router.get("/:id", exerciseController.getExercise)
router.get("/search/:key", exerciseController.searchExercise)

module.exports = router
