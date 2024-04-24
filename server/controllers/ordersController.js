const Order = require("../models/Orders");
const OrderDetails = require("../models/OrderDetails");

// create order
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json(newOrder._id);
  } catch (error) {
    res.status(500).json("Failed to create order", error);
  }
};

// read all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: "desc" });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to get all orders: ", error);
  }
};

// read order by order_id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.order_id });
    res.status(200).json(order);
  } catch (error) {
    console.error("Failed to get order: ", error);
  }
};

// update order by order_id
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.order_id },
      req.body
    );
    res.status(200).json(order);
  } catch (error) {
    console.error("Failed to update order: ", error);
  }
};

// delete order by order_id
const deleteOrder = async (req, res) => {
  try {
    // delete related OrderDetails
    await OrderDetails.deleteMany({ order_id: req.params.order_id });
    
    await Order.findOneAndDelete({ _id: req.params.order_id });
    res.status(200).json("Deleted order");
  } catch (error) {
    console.error("Failed to delete order: ", error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
