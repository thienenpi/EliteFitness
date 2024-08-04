const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    muscle: [{ type: String, require: true }],
    level: [{ type: String, require: true }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
