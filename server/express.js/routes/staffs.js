const router = require('express').Router();
const staffController = require('../controllers/staffsController');

router.post('/', staffController.createStaff);
router.get('/', staffController.getAllStaffs);
router.get('/:staff_id', staffController.getStaff);
router.put('/:staff_id', staffController.updateStaff);
router.delete('/:staff_id', staffController.deleteStaff);

module.exports = router;