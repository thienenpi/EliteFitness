const mongoose = require("mongoose");

// set _id of this schema to not required
const OrderDetailsSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

// give me 1 sample
// {
//     "order_id": "1",
//     "product_id": "1",
//     "quantity": 1,
//     "total": 100
// }

module.exports = mongoose.model("OrderDetails", OrderDetailsSchema);
