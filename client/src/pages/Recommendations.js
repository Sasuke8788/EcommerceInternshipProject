import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Recommendations() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`/api/recommendations/${user._id}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    };

    if (user) fetchRecommendations();
  }, [user]);

  return (
    <div>
      <h2>Recommended for You</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h4>{p.title}</h4>
            <img src={p.image} alt={p.title} style={{ width: '150px' }} />
            <p>₹ {p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
