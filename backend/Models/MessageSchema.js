const mongoose = require("mongoose");
const message = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", message);

module.exports = Message;
