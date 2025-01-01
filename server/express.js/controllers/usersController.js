const User = require("../models/Users");

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json("Created user");
  } catch (error) {
    res.status(500).json("Failed to create user", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: "desc" });
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get all users: ", error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOneAndDelete({ _id: userId });
    res.status(200).json({ message: "User deleted", user: user });
  } catch (error) {
    console.error("Failed to delete users: ", error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  deleteUserById,
};
