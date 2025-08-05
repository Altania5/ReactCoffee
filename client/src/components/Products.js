import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Destructure addToCart from the props
function Products({ token, addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // No changes needed here
    axios.get('http://localhost:5000/products/', { headers: { 'x-auth-token': token }})
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log('There was an error fetching the products!', error);
      });
  }, [token]);

  return (
    <div className="container">
      <h2>Menu</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <strong>{product.name}</strong> - {product.description} - ${product.price}r 
              <button onClick={() => addToCart(product)} style={{ marginLeft: '10px' }}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
      <hr />
    </div>
  );
}

export default Products;