const router = require("express").Router();
const ordersController = require("../controllers/ordersController");

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getAllOrders);
router.get("/:order_id", ordersController.getOrder);
router.put("/:order_id", ordersController.updateOrder);
router.delete("/:order_id", ordersController.deleteOrder);

module.exports = router;