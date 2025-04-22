const { validationResult } = require("express-validator");
const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");

//getUserDetails
const getUserDetails = async (req, res) => {
  try {
    const { _id } = req.user;
    // console.log(_id);

    const user = await User.findById(_id, "-password");
    // console.log(user);

    res.status(200).json({ message: "User details", user });
  } catch (err) {
    // console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user's details",
    });
  }
};
// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords in the response
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};
// Controller to view user
const viewUser = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the request params
    const user = await User.findById(id, "-password"); // Find user by ID and exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
    });
  }
};
// Controller to edit/update user
const editUserProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    // Find user by ID and update the user's fields
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, phone }, // Fields to update
      { new: true, runValidators: true } // Return the updated user and run validation on updated fields
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User updated successfully",
    });
  } catch (err) {
    // console.error("Error updating user:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};
// Controller to delete user
const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(req.user._id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Clear the authentication cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    // console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    });
  }
};
//  Controller to change Password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  // console.log(oldPassword, newPassword, confirmPassword);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array()[0].msg);

    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Provide all fields",
      });
    }
    // Find user by ID
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided old password with the stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, user?.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is not correct",
      });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm Password does not match the new Password",
      });
    }

    // Hash the new password before saving
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({
      success: false,
      message: "Server Error in changing password",
    });
  }
};
module.exports = {
  getAllUsers,
  editUserProfile,
  deleteUser,
  viewUser,
  changePassword,
  getUserDetails,
};
