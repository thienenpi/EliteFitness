const router = require("express").Router()
const muscleController = require("../controllers/musclesController")

router.post("/", muscleController.createMuscle)
router.get("/", muscleController.getAllMuscles)
router.get("/:id", muscleController.getMuscle)
router.get("/search/:key", muscleController.searchMuscle)

module.exports = router
