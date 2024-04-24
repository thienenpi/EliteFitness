const router = require('express').Router()
const productController = require('../controllers/productsController')
const { verifyUser } = require('../controllers/authController')

router.get('/', productController.getAllProducts)
router.get('/:id', verifyUser, productController.getProduct)
router.get('/search/:key', productController.searchProduct)
router.post('/', productController.createProduct)

module.exports = router
