const router = require("express").Router();
const ordersController = require("../controllers/ordersController");
const { verifyUser } = require("../controllers/authController");

router.post("/", verifyUser, ordersController.createOrder);
router.get("/", ordersController.getAllOrders);
router.get("/:order_id", ordersController.getOrder);
router.put("/:order_id", verifyUser, ordersController.updateOrder);
router.delete("/:order_id", ordersController.deleteOrder);

module.exports = router;