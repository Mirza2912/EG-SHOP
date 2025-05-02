const { body } = require("express-validator");

const createOrderValidation = [
  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("Order items are required and must be an array"),
  body("shippingAddress")
    .notEmpty()
    .withMessage("Shipping address is required"),
  body("shippingPrice")
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Shipping price must be a number and equal or greater than 0"),
  body("totalPrice")
    .isNumeric()
    .custom((value) => value >= 0)
    .withMessage("Shipping price must be a number and equal or greater than 0"),
  body("isPaid").optional().isBoolean().withMessage("isPaid must be boolean"),
  body("paidAt").optional().isDate().withMessage("paidAt must be a date"),
];

module.exports = {
  createOrderValidation,
};
