import React from 'react';
import Cart from '../components/Cart';
import OrderHistory from '../components/OrderHistory';
import Products from '../components/Products';

function OrderPage({ user, cart, setCart, addToCart }) {
  return (
    <div className="order-page">
      <Cart cart={cart} token={user.token} setCart={setCart} />
      <hr />
      <OrderHistory token={user.token} />
      <hr />
      <Products token={user.token} addToCart={addToCart} />
    </div>
  );
}

export default OrderPage;