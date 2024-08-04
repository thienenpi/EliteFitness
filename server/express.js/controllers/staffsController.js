const Staff = require("../models/Staffs");
const Order = require("../models/Orders");

// create staff
const createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    // check if password is used
    const staff = await Staff.findOne({ password: req.body.password });
    if (staff) {
      return res.status(400).json("Password already used");
    }
    // save staff
    await newStaff.save();
    res.status(200).json("Created staff");
  } catch (error) {
    res.status(500).json("Failed to create staff", error);
  }
};

// read all staffs
const getAllStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find().sort({ name: "desc" });
    res.status(200).json(staffs);
  } catch (error) {
    console.error("Failed to get all staffs: ", error);
  }
};

// read staff by staff_id
const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findOne({ _id: req.params.staff_id });
    res.status(200).json(staff);
  } catch (error) {
    console.error("Failed to get staff: ", error);
  }
};

// update staff by staff_id
const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      { _id: req.params.staff_id },
      req.body
    );
    res.status(200).json(staff);
  } catch (error) {
    console.error("Failed to update staff: ", error);
  }
};

// delete staff by staff_id
const deleteStaff = async (req, res) => {
  try {
    // check if staff_id is exist in table ORDERS
    const orders = await Order.find({ staff_id: req.params.staff_id });
    if (orders.length > 0) {
      // update stateID to 0
      await Staff.findOneAndUpdate(
        { _id: req.params.staff_id },
        { state_id: "0" }
      );
      return res.status(200).json("Staff is in use. StateID updated to 0");
    }
    // delete staff
    const staff = await Staff.findOneAndDelete({
      _id: req.params.staff_id,
    });
    res.status(200).json(staff);
  } catch (error) {
    console.error("Failed to delete staff: ", error);
  }
};

module.exports = {
  createStaff,
  getAllStaffs,
  getStaff,
  updateStaff,
  deleteStaff,
};
