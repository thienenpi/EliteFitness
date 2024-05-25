const router = require("express").Router();
const ordersController = require("../controllers/ordersController");
const { verifyUser } = require("../controllers/authController");

router.post("/", verifyUser, ordersController.createOrder);
router.get("/", verifyUser, ordersController.getAllOrders);
router.get("/:order_id", verifyUser, ordersController.getOrder);
router.put("/:order_id", verifyUser, ordersController.updateOrder);
router.delete("/:order_id", verifyUser, ordersController.deleteOrder);

module.exports = router;