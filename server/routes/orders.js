const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');

// 🔹 Create order (after checkout)
router.post('/', auth, async (req, res) => {
  try {
    const { items, amount } = req.body;

    const order = new Order({
      userId: req.user.id,
      items,
      amount,
      status: "paid"
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get user's own orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
