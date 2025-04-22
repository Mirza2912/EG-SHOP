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
const editUser = async (req, res) => {
  const { id } = req.params; // Assuming you're passing the user ID in the route parameters
  const { name, email, phone } = req.body; // Data you want to update (you can include other fields as needed)

  try {
    // Find user by ID and update the user's fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
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
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    });
  }
};
// Controller to delete user
const deleteUser = async (req, res) => {
  const { id } = req.params; // Assuming you're passing the user ID in the route parameters

  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    });
  }
};
//  Controller to change Password
const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided old password with the stored hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
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
      message: "Error in changing password",
      error: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  editUser,
  deleteUser,
  viewUser,
  changePassword,
  getUserDetails,
};
