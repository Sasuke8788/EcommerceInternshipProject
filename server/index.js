const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);
const checkoutRoutes = require('./routes/checkout');
app.use('/api/checkout', checkoutRoutes);
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);
const stripeRoutes = require('./routes/stripe');
app.use('/api/stripe', stripeRoutes);
const recommendationRoutes = require('./routes/recommendations');
app.use('/api/recommendations', recommendationRoutes);




app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

console.log("👉 Attempting to connect to MongoDB...");
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

