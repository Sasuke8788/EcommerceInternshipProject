import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/products', {
          params: { search, category }
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err.message);
      }
    };
    fetchData();
  }, [search, category]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>All Products</h2>


      <div style={{ marginBottom: '30px', display: 'flex', gap: '12px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: '1',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          <option value="">All Categories</option>
          <option value="shoes">Shoes</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>


      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}
      >
        {products.map((product) => (
          <div key={product._id} style={{
            border: '1px solid #e0e0e0',
            padding: '16px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '6px',
                marginBottom: '10px'
              }}
            />
            <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>₹ {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: '10px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
