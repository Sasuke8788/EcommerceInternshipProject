const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Fetch all orders for the user
    const orders = await Order.find({ userId });

    // 2. Extract all productIds the user has purchased
    const purchasedProductIds = orders.flatMap(order =>
      order.items.map(item => item.productId.toString())
    );

    // 3. Recommend products the user has NOT purchased
    const recommendations = await Product.find({
      _id: { $nin: purchasedProductIds }
    }).limit(5); // Limit to 5 recommended products

    res.json(recommendations);
  } catch (err) {
    console.error("❌ Recommendation Error:", err.message);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
