const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/feedbackController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/send', authMiddleware, messageController.sendMessage);
router.get('/conversation', authMiddleware, messageController.getConversation);
router.put('/read', authMiddleware, messageController.markAsRead);

module.exports = router;