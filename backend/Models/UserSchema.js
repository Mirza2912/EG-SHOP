const mongoose = require("mongoose");
// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email must be unique
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Regular expression to validate email
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should have at least 6 characters"], // Password should have at least 6 characters
    },
    phone: {
      type: String,
      required: false,
      match: [/^\d{11}$/, "is invalid"], // Regular expression to validate a 10-digit phone number
    },
    role: {
      type: String,
      enum: ["admin", "user", "owner", "tenant"],
      default: "user", // Default role is 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to the current date
    },
    updatedAt: {
      type: Date,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },

    isSuspended: {
      type: Boolean,
      default: false,
    },

    otp: String, // Token to reset password
    otpExpire: Date, // Expiration time for reset token
  },
  { timestamps: true }
);

// Pre-save middleware to handle updatedAt field
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
