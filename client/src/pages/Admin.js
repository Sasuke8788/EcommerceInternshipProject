import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: '',
    image: ''
  });

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post('/api/products', newProduct, {
        headers: { 'x-auth-token': token }
      });
      setNewProduct({ title: '', price: '', category: '', image: '' });
      fetchProducts();
    } catch (err) {
      alert('Add failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { 'x-auth-token': token }
      });
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛠 Admin Dashboard</h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        marginBottom: '30px'
      }}>
        <h3>Add New Product</h3>
        <input
          placeholder="Title"
          value={newProduct.title}
          onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
          style={{ padding: '8px' }}
        />
        <input
          placeholder="Price"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
          style={{ padding: '8px' }}
        />
        <input
          placeholder="Category"
          value={newProduct.category}
          onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
          style={{ padding: '8px' }}
        />
        <input
          placeholder="Image URL"
          value={newProduct.image}
          onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
          style={{ padding: '8px' }}
        />
        <button onClick={handleAdd} style={{ padding: '10px', background: 'blue', color: 'white', border: 'none' }}>
          ➕ Add Product
        </button>
      </div>

      <h3>🗂 All Products</h3>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h4>{p.title}</h4>
            <p>₹{p.price}</p>
            <p>{p.category}</p>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: '100px', objectFit: 'cover', marginBottom: '10px' }} />
            <button
              onClick={() => handleDelete(p._id)}
              style={{ padding: '6px', background: 'red', color: 'white', border: 'none' }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
