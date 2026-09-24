import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [editId, setEditId] = useState(null);

  // Fetch Products
  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/products', formData);
    }
    fetchProducts();
    setFormData({ name: '', description: '', price: '', image: '' });
    setEditId(null);
  };

  // Edit Product
  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product._id);
  };

  // Delete Product
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image} alt={product.name} width="100" />
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;