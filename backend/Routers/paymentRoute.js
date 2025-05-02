const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  processPayment,
  sendStripeApiKey,
} = require("../Controllers/paymentControler");

router.post("/processPayment", authMiddleware, processPayment);
router.get("/stripeapikey", authMiddleware, sendStripeApiKey);

module.exports = router;
