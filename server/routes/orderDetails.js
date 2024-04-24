const router = require("express").Router();
const orderDetailsController = require("../controllers/orderDetailsController");
const { verifyUser } = require("../controllers/authController");

router.post("/", verifyUser, orderDetailsController.createOrderDetails);
router.get("/", orderDetailsController.getAllOrderDetails);
router.get("/:order_id", orderDetailsController.getOrderDetails);
router.put(
  "/order_id=:order_id&product_id=:product_id",
  orderDetailsController.updateOrderDetails
);
router.delete(
  "/order_id=:order_id&product_id=:product_id",
  orderDetailsController.deleteOrderDetail
);
router.delete("/order_id=:order_id", orderDetailsController.deleteOrderDetails);

module.exports = router;
