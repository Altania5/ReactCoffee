import React from 'react';
import axios from 'axios';

function Cart({ cart, token, setCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // --- UPDATE THIS FUNCTION ---
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Prepare the data to be sent to the back-end
      const orderData = {
        cart: cart,
        total: total
      };

      // Prepare the headers with the authentication token
      const headers = {
        'x-auth-token': token
      };

      // Make the POST request to our secure endpoint
      await axios.post('http://localhost:5000/orders/add', orderData, { headers: headers });

      // If the order is successful:
      alert('Order placed successfully!');
      setCart([]); // Clear the cart

    } catch (err) {
      console.error(err);
      alert('There was an error placing your order.');
    }
  };

  if (cart.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item._id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Cart;