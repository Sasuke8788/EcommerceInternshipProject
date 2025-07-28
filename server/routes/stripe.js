const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

router.post('/create-checkout-session', async (req, res) => {
  const { cartItems, userId } = req.body;

  console.log("➡️ Incoming Checkout Request");
  console.log("🛒 cartItems:", cartItems);
  console.log("👤 userId:", userId);

  if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid userId or cartItems' });
  }

  try {
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title || 'Product',
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const newOrder = new Order({
      userId,
      items: cartItems.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        productId: item._id,
      })),
      amount,
    });

    await newOrder.save();
    console.log("✅ Order saved successfully");

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Checkout Error:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

