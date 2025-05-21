const { Conversation, Message } = require("../Models/FeedBackSchema");
const User = require("../Models/UserSchema");

const messageController = {
  // Send a new message
  sendMessage: async (req, res) => {
    try {
      const { message, recipientId } = req.body;
      console.log("is admin: ", req.user);
      const senderId = req.user._id;
      if (req.user.role === "admin") {
        if (!recipientId) {
          return res
            .status(400)
            .json({ success: false, message: "Recipient id is required" });
        }
      }
      if (!message) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }

      if (req.user.role === "admin") {
        const recipient = await User.findById(recipientId);
        if (!recipient || recipient.role === "admin") {
          return res.status(400).json({
            success: false,
            message: "Invalid recipient or recipient is an admin",
          });
        }
      }

      let conversation = undefined;
      if (req.user.role === "admin") {
        conversation = await Conversation.findOne({
          participants: { $all: [senderId, recipientId], $size: 2 },
        });
        if (!conversation) {
          conversation = await Conversation.create({
            participants: [senderId, recipientId],
          });
        }
      } else {
        conversation = await Conversation.findOne({
          participants: { $all: [senderId], $size: 2 },
        });
        if (!conversation) {
          const admin = await User.findOne({ role: "admin" });
          if (!admin) {
            return res.status(404).json({
              success: false,
              message: "No admin found to start conversation",
            });
          }
          conversation = await Conversation.create({
            participants: [senderId, admin._id],
          });
        }
      }

      const recipient =
        req.user.role === "admin"
          ? recipientId
          : conversation.participants.find(
              (participant) => participant.toString() !== senderId.toString()
            );

      // Create new message
      const newMessage = await Message.create({
        sender: senderId,
        recipient: recipient,
        message,
        conversationId: conversation._id,
      });

      // Update conversation with last message and unread count
      conversation.lastMessage = newMessage._id;
      conversation.unreadCount += 1;
      await conversation.save();

      res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
      console.error("Error in sendMessage:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Get conversation history
  getConversation: async (req, res) => {
    try {
      const userId = req.user._id;
      const { recipientId } = req.params; // Optional recipientId for admins

      let conversations = [];
      let messages = [];

      if (req.user.role === "admin") {
        if (recipientId) {
          // Admin wants a specific conversation with a user
          const conversation = await Conversation.findOne({
            participants: { $all: [userId, recipientId], $size: 2 },
          }).populate("lastMessage");

          if (!conversation) {
            return res
              .status(404)
              .json({ success: false, message: "Conversation not found" });
          }

          messages = await Message.find({ conversationId: conversation._id })
            .populate("sender", "name email")
            .populate("recipient", "name email")
            .sort("createdAt");

          return res
            .status(200)
            .json({ success: true, conversation, messages });
        } else {
          // Admin wants all conversations
          conversations = await Conversation.find({
            participants: userId,
          }).populate("lastMessage participants", "name email");

          // Fetch messages for each conversation
          const conversationPromises = conversations.map(async (conv) => {
            const convMessages = await Message.find({
              conversationId: conv._id,
            })
              .populate("sender", "name email")
              .populate("recipient", "name email")
              .sort("createdAt");
            return { conversation: conv, messages: convMessages };
          });

          const results = await Promise.all(conversationPromises);
          return res
            .status(200)
            .json({ success: true, conversations: results });
        }
      } else {
        // Non-admin user: get their conversation
        const conversation = await Conversation.findOne({
          participants: { $all: [userId], $size: 2 },
        }).populate("lastMessage");

        if (!conversation) {
          return res
            .status(404)
            .json({ success: false, message: "Conversation not found" });
        }

        messages = await Message.find({ conversationId: conversation._id })
          .populate("sender", "name email")
          .populate("recipient", "name email")
          .sort("createdAt");

        return res.status(200).json({ success: true, conversation, messages });
      }
    } catch (error) {
      console.error("Error in getConversation:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  // Mark messages as read
  markAsRead: async (req, res) => {
    try {
      const userId = req.user._id;
      const { recipientId } = req.params;

      let conversation;
      if (req.user.role === "admin" && recipientId) {
        conversation = await Conversation.findOne({
          participants: { $all: [userId, recipientId], $size: 2 },
        });
      } else {
        conversation = await Conversation.findOne({
          participants: { $all: [userId], $size: 2 },
        });
      }

      if (!conversation) {
        return res
          .status(404)
          .json({ success: false, message: "Conversation not found" });
      }

      await Message.updateMany(
        { conversationId: conversation._id, recipient: userId, isRead: false },
        { $set: { isRead: true } }
      );
      conversation.unreadCount = 0;
      await conversation.save();

      res
        .status(200)
        .json({ success: true, message: "Messages marked as read" });
    } catch (error) {
      console.error("Error in markAsRead:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
};

module.exports = messageController;
