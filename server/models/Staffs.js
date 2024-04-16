const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, },
    password: { type: String, required: true, unique: true },
    permission_id: { type: String, required: true },
    state_id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);
