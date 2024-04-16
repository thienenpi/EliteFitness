const OrderDetails = require("../models/OrderDetails");

// create order details
const createOrderDetails = async (req, res) => {
  try {
    const newOrderDetails = new OrderDetails(req.body);
    // check if order_id and product_id already exists
    const existingOrderDetails = await OrderDetails.findOne({
      order_id: newOrderDetails.order_id,
      product_id: newOrderDetails.product_id,
    });

    if (existingOrderDetails) {
      return res.status(403).json("Order details already exists");
    }

    await newOrderDetails.save();
    res.status(200).json("Created order details");
  } catch (error) {
    res.status(500).json("Failed to create order details", error);
  }
};

// read all order details
const getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.find().sort({ createdAt: "desc" });
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Failed to get all order details: ", error);
  }
};

// read order details by order_id
const getOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.find({
      order_id: req.params.order_id,
    });
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Failed to get order details: ", error);
  }
};

// update order details by order_id and product_id
const updateOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetails.findOneAndUpdate(
      {
        order_id: req.params.order_id,
        product_id: req.params.product_id,
      },
      req.body
    );
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Failed to update order details: ", error);
  }
};

// delete order details by order_id
const deleteOrderDetails = async (req, res) => {
  try {
    // check if order_id exists
    const existingOrderDetails = await OrderDetails.findOne({
      order_id: req.params.order_id,
    });

    if (!existingOrderDetails) {
      return res.status(403).json("Order details does not exist");
    }

    await OrderDetails.deleteMany({ order_id: req.params.order_id });
    res.status(200).json("Deleted order details");
  } catch (error) {
    console.error("Failed to delete order details: ", error);
  }
};

// delete order details by order_id and product_id
const deleteOrderDetail = async (req, res) => {
  try {
    // check if order_id and product_id exists
    const existingOrderDetails = await OrderDetails.findOne({
      order_id: req.params.order_id,
      product_id: req.params.product_id,
    });

    if (!existingOrderDetails) {
      return res.status(403).json("Order details does not exist");
    }

    await OrderDetails.deleteOne({
      order_id: req.params.order_id,
      product_id: req.params.product_id,
    });
    res.status(200).json("Deleted order detail");
  } catch (error) {
    console.error("Failed to delete order detail: ", error);
  }
};

module.exports = {
  createOrderDetails,
  getAllOrderDetails,
  getOrderDetails,
  updateOrderDetails,
  deleteOrderDetail,
  deleteOrderDetails,
};
