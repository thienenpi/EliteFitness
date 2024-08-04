const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    staff_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    total: { type: Number, required: true },
    state_id: { type: String, required: true },
  },
  { timestamps: true }
);

// give me a sample
// {
//   "staff_id": "60f0c0b9c3e4e00015f2b5d3",
//   "customer_id": "60f0c0b9c3e4e00015f2b5d3",
//   "total": 100,
//   "state_id": "60f0c0b9c3e4e00015f2b5d3"
// }

module.exports = mongoose.model("Order", OrderSchema);