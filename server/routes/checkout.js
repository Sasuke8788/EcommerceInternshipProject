const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Product = require('../models/Product');

router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]

    const products = await Promise.all(
      items.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.title,
              images: [product.image],
            },
            unit_amount: product.price * 100, // price in paisa
          },
          quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
