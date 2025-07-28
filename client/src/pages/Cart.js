import React from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

function Cart() {
  const { cart, removeFromCart } = useCart();
  const handleCheckout = async () => {
  try {
    const res = await axios.post('/api/stripe/create-checkout-session', {
      cartItems: cart,
      userId: user?.id, // ✅ use _id
    });
    window.location.href = res.data.url;
  } catch (err) {
    alert('Checkout failed');
    console.error(err);
  }
};

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                <strong>{item.title}</strong> — ₹ {item.price} × {item.quantity}
                <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout} style={{ marginTop: '20px' }}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
