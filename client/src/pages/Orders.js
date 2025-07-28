import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: {
            'x-auth-token': token
          }
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders", err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <strong>Order ID:</strong> {order._id}<br />
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}<br />
              <strong>Total:</strong> ₹{order.amount}<br />
              <strong>Status:</strong> {order.status}<br />
              <strong>Items:</strong>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} — ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
