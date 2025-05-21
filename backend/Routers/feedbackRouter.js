const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();
const messageController = require("../Controllers/feedbackController");

router.post("/send", authMiddleware, messageController.sendMessage);
router.get("/conversation", authMiddleware, messageController.getConversation);
router.put("/read", authMiddleware, messageController.markAsRead);

module.exports = router;
