const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const fetchUser = require("../middleware/fetchUser");
const generateInvoice = require("../utils/invoiceGenerator");

// GET invoice PDF
router.get("/invoice/:orderId", fetchUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // SECURITY CHECK
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    generateInvoice(order, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Invoice generation failed" });
  }
});

module.exports = router;
