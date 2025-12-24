const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");

// Hardcoded promo 
const PROMOS = {
  CHRISTMAS25: 25
};

router.post("/apply", fetchUser, async (req, res) => {
  const { code, totalAmount } = req.body;

  const discountPercent = PROMOS[code];

  if (!discountPercent) {
    return res.status(400).json({ success: false, message: "Invalid promo code" });
  }

  const discountAmount = Math.floor(
    (totalAmount * discountPercent) / 100
  );

  const finalAmount = totalAmount - discountAmount;

  res.json({
    success: true,
    code,
    discountPercent,
    discountAmount,
    finalAmount
  });
});

module.exports = router;
